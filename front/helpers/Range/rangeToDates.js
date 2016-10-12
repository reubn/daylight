/* eslint no-param-reassign: 0 */
import moment from 'moment'

export default function rangeToDays({start, end}){
  start.startOf('day'); end.startOf('day')
  if(start.isAfter(end)) [end, start] = [start, end]

  const diff = end.diff(start, 'd')
  let result = []
  for(let i = 0; i <= diff; i++) result = [...result, moment(start).add(i, 'd')]
  return result
}
