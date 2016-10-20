import {connect} from 'react-redux'

import LocationIcon from '../LocationIcon'

const mapStateToProps = ({aesthetics: {locationCategories, iconImageSize}}) => ({locationCategories, iconImageSize})
const mapDispatchToProps = {
  selectFeature: displayFeature => ({type: 'SELECT_FEATURE', displayFeature})
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationIcon)
