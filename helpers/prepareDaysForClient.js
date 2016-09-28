module.exports = days => days.map(({day, features, errors}) => {
  const readyDay = day.clean()
  const readyFeatures = features.map(feature => feature.clean())
  const readyErrors = !!errors && !!errors.length ? errors.map(({message, name}) => ({reason: message||name||'Unhandled'})) : undefined
  return {day: readyDay, features: readyFeatures, errors: readyErrors}
})
