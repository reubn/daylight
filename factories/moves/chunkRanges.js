/* eslint no-param-reassign: 0 */

const chunkRange = (range, startDate, size=6, {start=range, end=start}=range) => {
  start.startOf('day'); end.startOf('day')

  if(start.isAfter(end)) [end, start] = [start, end]

  if(start.isBefore(startDate)) start = startDate.clone()
  if(end.isBefore(startDate)) return []

  if(start.startOf('day').isSame(end)) return [{start, end: start}]

  const diff = end.diff(start, 'days')
  let chunks = []
  let count = 0

  while(count <= diff){
    chunks = [...chunks, {start: start.clone().add(count, 'days'), end: count + size > diff ? end : start.clone().add(count + size, 'days')}]
    count += size + 1
  }

  return chunks
}

module.exports = (ranges, ...args) => ranges.reduce((requests=[], range) => [...requests, ...chunkRange(range, ...args)], [])
