import {divIcon} from 'leaflet'

import {icon, small, innerIcon, selected as selectedStyle, editing as editingStyle} from './style'

const mapIcon = ({cat: {url}={}, imageSize, size=20, selected=false, editing=false}={}) => divIcon(
  url ? {
    className: `${icon} ${selected ? selectedStyle : ''} ${editing ? editingStyle : ''}`,
    html: `<div class="${innerIcon}" style="-webkit-mask-image: url(https://foursquare.com/img/categories_v2/${url}_${imageSize}.png);"></div>`,
    iconSize: [36, 36],
    popupAnchor: [0, -20]
  } : {
    className: `${icon} ${small} ${selected ? selectedStyle : ''} ${editing ? editingStyle : ''}`,
    iconSize: [size, size],
    popupAnchor: [0, -12]
  })

export default mapIcon
