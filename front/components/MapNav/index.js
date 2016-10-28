import React from 'react'

import RangeSelectorContainer from '../RangeSelectorContainer'
import UpdateButtonContainer from '../UpdateButtonContainer'

import {mapNav} from './style'

const MapNav = () => (
  <footer className={mapNav}>
    <RangeSelectorContainer />
    <UpdateButtonContainer />
  </footer>
)

export default MapNav
