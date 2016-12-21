import {Polyline} from 'react-leaflet'

class EditLine extends Polyline {
  componentWillMount(){
    super.componentWillMount()
    const {editing} = this.props
    if(editing) this.leafletElement.enableEdit()
  }

  componentDidUpdate({editing: previousEditing, ...props}){
    super.componentDidUpdate({...props})
    const {editing, displayFeature, editFeature} = this.props
    if(editing !== previousEditing){
      this.leafletElement.toggleEdit()
      if(!editing) editFeature({feature: displayFeature, payload: {geo: this.leafletElement.getLatLngs()}})
    }
  }
}


export default EditLine
