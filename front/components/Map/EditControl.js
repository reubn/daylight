import {PropTypes} from 'react'
import L from 'leaflet'
import {} from 'leaflet-draw'
import {} from 'leaflet-draw/dist/leaflet.draw.css'

import {MapControl} from 'react-leaflet'

export default class EditControl extends MapControl {
  static propTypes = {
    onCreate: PropTypes.func,
    onEdit: PropTypes.func
  }
  static contextTypes = {
    layerContainer: PropTypes.object,
    map: PropTypes.object
  }

  componentWillMount(){
    console.log(this.context)
    this.leafletElement = new L.Control.Draw(Object.assign({}, {
      edit: {
        featureGroup: this.context.layerContainer
      }
    }, this.props))

    this.context.map.on('draw:created', e => {
      this.context.layerContainer.addLayer(e.layer)
      this.props.onCreate.call(null, e)
    })

    this.context.map.on('draw:edited', this.props.onEdit)
  }
}
