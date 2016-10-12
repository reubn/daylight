import moment from 'moment'

export default (Range, url) => {
  const [start, end=start] = url.split('/')
  return new Range({start: moment(start, 'YYYYMMDD'), end: end ? moment(end, 'YYYYMMDD') : moment(start, 'YYYYMMDD')})
}
