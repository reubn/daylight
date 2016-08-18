import {connect} from 'react-redux'

import PlaceIcon from '../PlaceIcon'

const mapStateToProps = ({aesthetics: {placeCategories}}) => ({placeCategories})

export default connect(mapStateToProps)(PlaceIcon)
