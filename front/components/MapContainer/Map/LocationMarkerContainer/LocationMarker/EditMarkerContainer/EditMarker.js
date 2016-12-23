import {Marker} from 'react-leaflet'

class EditMarker extends Marker {
  componentWillMount(){
    super.componentWillMount()
    const {editing} = this.props
    if(editing) this.leafletElement.enableEdit()
  }

  componentDidUpdate({editing: previousEditing, ...props}){
    super.componentDidUpdate({...props})
    const {editing, displayFeature, editLocation} = this.props
    if(editing !== previousEditing){
      this.leafletElement.toggleEdit()
      if(!editing) editLocation({feature: displayFeature, payload: {geo: this.leafletElement.getLatLng()}})
    }
  }
}


export default EditMarker
