const Day = require('../../models/Day')

const chunkRanges = require('./chunkRanges')
const storylineRequest = require('./storylineRequest')

const visitProcessor = require('./processors/visit')
const moveProcessor = require('./processors/move')

module.exports = (factory, user, dayPromises) => {
  const {accessToken, startDate} = factory.diplomat.getUserData(user)

  return Promise.all(dayPromises)
  .then(days =>
    Promise.all(
      chunkRanges(Day.daysToRanges(days), startDate)
        .map(range =>
          storylineRequest(accessToken, range)
          .catch((error, {status}=error) => {
            if(status === 401) return factory.refreshAccessToken(user).then(({accessToken: newAccessToken}) => storylineRequest(newAccessToken, range))
            throw error
          })
          .then(({data: daysFromRequest}) => daysFromRequest)
          .catch(() => Promise.all(Day.rangeToDays(range, user)).then(errorDays => errorDays.map(({date}) => ({date: date.format('YYYYMMDD'), errors: [new Error('SingleRequestError')]}))))
        )
    )
    .then(requests => requests.reduce((array, request) => [...array, ...request], []))
    .then(daysFromRequest =>
      daysFromRequest.reduce((daysForReducing, {errors: requestErrors=[], segments, date: dateString}) => {
        const index = daysForReducing.findIndex(({day: {date}}) => date.format('YYYYMMDD') === dateString)
        const {day} = daysForReducing[index]

        const completeFeaturePromises = (segments||[]).reduce((existingPromises, segment) =>
          (segment.type === 'off' ? existingPromises : [...existingPromises, (segment.type === 'move' ? moveProcessor : visitProcessor)(factory, day, user, segment)]), [])

        daysForReducing[index] = {day, featurePromises: completeFeaturePromises, errors: requestErrors}
        return daysForReducing
      }, days.map(day => ({day, featurePromises: [], errors: []})))
    )
    .then(daysWithPromises => Promise.all(
      daysWithPromises.map(({day, featurePromises, errors: requestErrors}) =>
        Promise.all(featurePromises)
        .then(featuresOrErrors => featuresOrErrors.reduce(({features: existingFeatures, errors: existingErrors}, {features: segmentFeatures=[], errors: segmentErrors=[]}) =>
          ({features: [...existingFeatures, ...segmentFeatures], errors: [...existingErrors, ...segmentErrors]}),
          {features: [], errors: requestErrors}))
        .then(({features, errors}) => ({day, features, errors}))
      )
    ))
   )
}
