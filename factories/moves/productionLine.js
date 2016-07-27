const Day = require('../../models/Day')

const chunkRanges = require('./chunkRanges')
const storylineRequest = require('./storylineRequest')

const placeProcessor = require('./processors/place')
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

        const {features: completeFeatures, errors: completeErrors} = (segments||[]).reduce(({features: existingFeatures=[], errors: existingErrors=[]}, segment) => {
          if(segment.type === 'off') return {features: existingFeatures, errors: existingErrors}
          const {features: segmentFeatures, errors: segmentErrors=[]} = (segment.type === 'move' ? moveProcessor : placeProcessor)(factory, day, segment)

          return {features: [...existingFeatures, ...segmentFeatures], errors: [...existingErrors, ...segmentErrors]}
        }, {features: [], errors: requestErrors})

        daysForReducing[index] = {day, features: completeFeatures, errors: completeErrors}
        return daysForReducing
      }, days.map(day => ({day, features: [], errors: []})))
    )
  )
}
