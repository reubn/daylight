export default (getState, date) => getState().map.days.find(({day: {date: existingDate}}) => date.isSame(existingDate))
