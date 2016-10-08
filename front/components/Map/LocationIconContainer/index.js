import {connect} from 'react-redux'

import LocationIcon from '../LocationIcon'

const mapStateToProps = ({aesthetics: {locationCategories}}) => ({locationCategories})

export default connect(mapStateToProps)(LocationIcon)
