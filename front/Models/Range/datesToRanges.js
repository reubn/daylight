export default (Range, dates) => {
  if(dates.length === 0) return []
  const sorted = dates.sort((a, b) => a.diff(b, 'd'))

  let previousDate = sorted[0].clone().subtract(1, 'd')
  let sortedPos = 0
  let resultPos = 0
  const result = []

  while(sortedPos < sorted.length){
    if(sorted[sortedPos].isSame(previousDate.clone().add(1, 'd'), 'd') || sorted[sortedPos].isSame(previousDate, 'd')){
      if(result[resultPos]){
        result[resultPos].end = sorted[sortedPos]
        // result[resultPos].days = [...result[resultPos].days, sorted[sortedPos]]
      } else {
        result[resultPos] = new Range({start: sorted[sortedPos], end: sorted[sortedPos]/* , days: [sorted[sortedPos]]*/})
      }
    } else {
      result[resultPos] = new Range({start: sorted[sortedPos], end: sorted[sortedPos]/* , days: [sorted[sortedPos]]*/})
      resultPos += 1
    }

    previousDate = sorted[sortedPos]
    sortedPos += 1
  }

  return result
}
