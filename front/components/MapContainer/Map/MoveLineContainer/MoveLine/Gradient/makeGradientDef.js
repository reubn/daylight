function createGradientDef({id, stops, coords: [{lat: lat1, lng: lng1}, {lat: lat2, lng: lng2}]}){
  const svgGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
  svgGradient.setAttribute('id', id)

  const rads = Math.atan2(Math.sin(lng2-lng1) * Math.cos(lat2), (Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2-lng1)))
  svgGradient.setAttribute('x1', `${50 + (Math.sin(rads) * 50)}%`)
  svgGradient.setAttribute('y1', `${50 + (Math.cos(rads) * 50)}%`)
  svgGradient.setAttribute('x2', `${50 + (Math.sin(rads + Math.PI) * 50)}%`)
  svgGradient.setAttribute('y2', `${50 + (Math.cos(rads + Math.PI) * 50)}%`)

  stops.forEach(({offset, color, colour=color}) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    element.setAttribute('offset', `${offset}%`)
    element.setAttribute('stop-color', colour)
    svgGradient.appendChild(element)
  })

  return svgGradient
}

export default createGradientDef
