export default (getState, date) => (getState().map.cache.days.find(({day: {date: existingDate}}) => date.isSame(existingDate)) || {day: {id: null}}).day.id
