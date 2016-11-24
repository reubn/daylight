import moment from 'moment'

import Range from '../../models/Range'

export default ({params: {from, to}, selectRange}) => {
  if(!from && !to) return selectRange(new Range({start: moment().subtract(1, 'd')}))

  if(to) return selectRange(new Range({start: moment(from, 'YYYYMMDD'), end: moment(to, 'YYYYMMDD')}), false)
  selectRange(new Range({start: moment(from, 'YYYYMMDD')}), false)
}
