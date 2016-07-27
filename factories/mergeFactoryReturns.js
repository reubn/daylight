module.exports = factoryReturns => {
  const flatDayPairs = factoryReturns.reduce((array, ret) => [...array, ...ret], [])

  const result = []
  let key = []

  for(let index = 0; index < flatDayPairs.length; index++){
    const {day, features, errors} = flatDayPairs[index]
    const keyIndex = key.indexOf(day._id)

    if(keyIndex !== -1){
      if(result[keyIndex]){
        result[keyIndex].features = [...result[keyIndex].features, ...features]
        result[keyIndex].errors = [...result[keyIndex].errors, ...errors]
      } else {
        result[keyIndex] = {day, features, errors}
      }
    } else {
      key = [...key, day._id]
      result[key.length - 1] = {day, features, errors}
    }
  }

  return result
}
