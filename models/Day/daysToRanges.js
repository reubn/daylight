module.exports = days => {
  if(days.length === 0) return []
  const sorted = days.sort((a, b) => a.date.diff(b.date, 'd'))

  let previousDate = sorted[0].date.clone().subtract(1, 'd')
  let sortedPos = 0
  let resultPos = 0
  const result = []

  while(sortedPos < sorted.length){
    if(sorted[sortedPos].date.isSame(previousDate.clone().add(1, 'd'), 'd') || sorted[sortedPos].date.isSame(previousDate, 'd')){
      if(result[resultPos]){
        result[resultPos].end = sorted[sortedPos].date
        result[resultPos].days = [...result[resultPos].days, sorted[sortedPos]]
      } else {
        result[resultPos] = {start: sorted[sortedPos].date, end: sorted[sortedPos].date, days: [sorted[sortedPos]]}
      }
    } else {
      result[resultPos] = {start: sorted[sortedPos].date, end: sorted[sortedPos].date, days: [sorted[sortedPos]]}
      resultPos += 1
    }

    previousDate = sorted[sortedPos].date
    sortedPos += 1
  }

  return result
}
