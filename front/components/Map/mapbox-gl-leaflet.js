import L from 'leaflet'
import mapboxgl from 'mapbox-gl'

const MapboxGlLeaflet = L.Class.extend({
  initialize(options){
    L.setOptions(this, options)

    if(options.accessToken){
      mapboxgl.accessToken = options.accessToken
    } else {
      throw new Error('You should provide a Mapbox GL access token as a token option.')
    }
  },

  onAdd(map){
    this._map = map

    if(!this._glContainer){
      this._initContainer()
    }

    map._panes.tilePane.appendChild(this._glContainer)
    map.on('zoomanim', this._animateZoom, this)
    map.on('move', this._update, this)

    this._initGL()
  },

  onRemove(map){
    map.getPanes().tilePane.removeChild(this._glContainer)
    map.off('zoomanim', this._animateZoom, this)
    map.off('move', this._update, this)
    this._glMap.remove()
    this._glMap = null
  },

  addTo(map){
    map.addLayer(this)
    return this
  },

  _initContainer(){
    const container = this._glContainer = L.DomUtil.create('div', 'leafconst-gl-layer')

    const size = this._map.getSize()
    container.style.width = `${size.x}px`
    container.style.height = `${size.y}px`
  },

  _initGL(){
    const center = this._map.getCenter()

    const options = L.extend({}, this.options, {
      container: this._glContainer,
      interactive: false,
      center: [center.lng, center.lat],
      zoom: this._map.getZoom() - 1,
      attributionControl: false
    })

    this._glMap = new mapboxgl.Map(options)
    // allow GL base map to pan beyond min/max latitudes
    this._glMap.transform.latRange = null
  },

  _update(){
    const size = this._map.getSize()
    const container = this._glContainer
    const gl = this._glMap
    const topLeft = this._map.containerPointToLayerPoint([0, 0])

    L.DomUtil.setPosition(container, topLeft)

    const center = this._map.getCenter()

    // gl.setView([center.lat, center.lng], this._map.getZoom() - 1, 0)
    // calling setView directly causes sync issues because it uses requestAnimFrame

    const tr = gl.transform
    tr.center = mapboxgl.LngLat.convert([center.lng, center.lat])
    tr.zoom = this._map.getZoom() - 1

    if(gl.transform.width !== size.x || gl.transform.height !== size.y){
      container.style.width = `${size.x}px`
      container.style.height = `${size.y}px`
      gl.resize()
    } else {
      gl._update()
    }
  },

  _animateZoom(e){
    const origin = e.origin.add(this._map._getMapPanePos()).subtract(this._map.getSize().divideBy(2))
    this._glMap.zoomTo(e.zoom - 1, {
      duration: 250,
      offset: [origin.x, origin.y]
    })
  }
})

export default function(options){
  return new MapboxGlLeaflet(options)
}
