import moment from 'moment'

export default props => {
  if(props.params.from) props.selectDay(moment(props.params.from, 'YYYYMMDD'))
  if(props.params.to) props.selectDay(moment(props.params.from, 'YYYYMMDD'), moment(props.params.to, 'YYYYMMDD'))
}
