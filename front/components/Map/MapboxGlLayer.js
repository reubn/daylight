/* eslint-disable */

import {MapLayer} from 'react-leaflet'

import L from 'leaflet'
import mapboxgl from 'mapbox-gl'

const MapboxGlLeaflet = L.Layer.extend({
  options: {
    updateInterval: 32
  },

  initialize(options){
    L.setOptions(this, options)

    if(options.accessToken){
      mapboxgl.accessToken = options.accessToken
    } else {
      throw new Error('You should provide a Mapbox GL access token as a token option.')
    }

    /**
    * Create a version of `fn` that only fires once every `time` millseconds.
    *
    * @param {Function} fn the function to be throttled
    * @param {number} time millseconds required between function calls
    * @param {*} context the value of `this` with which the function is called
    * @returns {Function} debounced function
    * @private
    */
    const throttle = function(fn, time, context){
      let lock
      let args

      function wrapperFn(...a){
        if(lock){
                    // called too soon, queue to call later
          args = a
        } else {
                    // call and lock until later
          fn.apply(context, a)
          setTimeout(later, time)
          lock = true
        }
      }

      function later(){
                // reset lock and call if queued
        lock = false
        if(args){
          wrapperFn.apply(context, args)
          args = false
        }
      }

      return wrapperFn
    }

        // setup throttling the update event when panning
    this._throttledUpdate = throttle(L.Util.bind(this._update, this), this.options.updateInterval)
  },

  onAdd(map){
    this._map = map

    if(!this._glContainer){
      this._initContainer()
    }

    map._panes.tilePane.appendChild(this._glContainer)

    this._initGL()
  },

  onRemove(map){
    map.getPanes().tilePane.removeChild(this._glContainer)
    this._glMap.remove()
    this._glMap = null
  },

  getEvents(){
    return {
      move: this._throttledUpdate, // sensibly throttle updating while panning
      zoomanim: this._animateZoom, // applys the zoom animation to the <canvas>
      zoom: this._pinchZoom, // animate every zoom event for smoother pinch-zooming
      zoomstart: this._zoomStart, // flag starting a zoom to disable panning
      zoomend: this._zoomEnd // reset the gl map view at the end of a zoom
    }
  },

  addTo(map){
    map.addLayer(this)
    return this
  },

  _initContainer(){
    const container = this._glContainer = L.DomUtil.create('div', 'leaflet-gl-layer')

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

        // treat child <canvas> element like L.ImageOverlay
    L.DomUtil.addClass(this._glMap._canvas, 'leaflet-image-layer')
    L.DomUtil.addClass(this._glMap._canvas, 'leaflet-zoom-animated')
  },

  _update(e){
        // update the offset so we can correct for it later when we zoom
    this._offset = this._map.containerPointToLayerPoint([0, 0])

    if(this._zooming){
      return
    }

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

    // update the map constantly during a pinch zoom
  _pinchZoom(e){
    this._glMap.jumpTo({
      zoom: this._map.getZoom() - 1,
      center: this._map.getCenter()
    })
  },

    // borrowed from L.ImageOverlay https://github.com/Leaflet/Leaflet/blob/master/src/layer/ImageOverlay.js#L139-L144
  _animateZoom(e){
    const scale = this._map.getZoomScale(e.zoom)
    const offset = this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(), e.zoom, e.center)

    L.DomUtil.setTransform(this._glMap._canvas, offset.subtract(this._offset || L.point(0, 0)), scale)
  },

  _zoomStart(){
    this._zooming = true
  },

  _zoomEnd(){
    const zoom = this._map.getZoom()
    const center = this._map.getCenter()
    const offset = this._map.latLngToContainerPoint(this._map.getBounds().getNorthWest())

      // update the map on the next available frame to avoid stuttering
    L.Util.requestAnimFrame(function(){
        // reset the scale and offset
      L.DomUtil.setTransform(this._glMap._canvas, offset, 1)

        // enable panning once the gl map is ready again
      this._glMap.once('moveend', L.Util.bind(function(){
        this._zooming = false
      }, this))

        // update the map position
      this._glMap.jumpTo({
        center,
        zoom: zoom - 1
      })
    }, this)
  }
})

export default class MapboxGlLayer extends MapLayer {
  componentWillMount(){
    super.componentWillMount()
    this.leafletElement = new MapboxGlLeaflet(this.props)
  }
}
