import {connect} from 'react-redux'

import LocationIcon from '../LocationIcon'

const mapStateToProps = ({aesthetics: {locationCategories, iconImageSize}}) => ({locationCategories, iconImageSize})

export default connect(mapStateToProps)(LocationIcon)
