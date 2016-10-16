import React from 'react'

import RangeSelectorContainer from '../RangeSelectorContainer'
import UpdateButtonContainer from '../UpdateButtonContainer'

import {mapNav} from './style'

const MapNav = () => (
  <header className={mapNav}>
    <RangeSelectorContainer />
    <UpdateButtonContainer />
  </header>
)

export default MapNav
