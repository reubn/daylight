module.exports = (range, size=6, {start=range, end=start}=range) => {
  start.startOf('day'); end.startOf('day')
  if(start.isAfter(end)) [end, start] = [start, end]
  if(start.startOf('day').isSame(end)) return [{from: start, to: start}]

  const diff = end.diff(start, 'days')
  let chunks = []
  let count = 0

  while(count <= diff){
    chunks = [...chunks, {from: start.clone().add(count, 'days'), to: count + size > diff ? end : start.clone().add(count + size, 'days')}]
    count += size + 1
  }
  return chunks
}
