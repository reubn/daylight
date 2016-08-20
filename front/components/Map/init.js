import moment from 'moment'

export default ({params: {from, to}, selectDay}) => {
  if(to) selectDay(moment(from, 'YYYYMMDD'), moment(to, 'YYYYMMDD'))
  if(from && !to) selectDay(moment(from, 'YYYYMMDD'))
}
