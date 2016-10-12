import moment from 'moment'

import Range from '../../helpers/Range'

export default ({params: {from, to}, selectRange}) => {
  if(to) selectRange(new Range({start: moment(from, 'YYYYMMDD'), end: moment(to, 'YYYYMMDD')}), false)
  if(from && !to) selectRange(new Range({start: moment(from, 'YYYYMMDD')}), false)
}
