import moment from 'moment'

import Range from '../../../models/Range'

export default ({params: {from, to, feature}, location: {action}, selectRange, selectFeature}) => {
  if(!from && !to) return selectRange(new Range({start: moment().subtract(1, 'd')}))
  if(action !== 'POP' && action !== 'REPLACE') return

  if(to) selectRange(new Range({start: moment(from, 'YYYYMMDD'), end: moment(to, 'YYYYMMDD')}), false).then(() => {if(feature) selectFeature(feature)})
  else selectRange(new Range({start: moment(from, 'YYYYMMDD')}), false).then(() => {if(feature) selectFeature(feature)})
}
