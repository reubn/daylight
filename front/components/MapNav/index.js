import React from 'react'

const MapNav = ({goYesterday, goTomorrow, selectRange, range}) => (
  <span>
    {range ? range.toURL() : 'Nada!'}
  </span>
  )

export default MapNav
