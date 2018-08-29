import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import GetOverlay from './overlay'

export class Popup extends React.Component {

  componentDidMount() {
    const Overlay = GetOverlay( google )
    this.overlay = new Overlay( this.props )
    this.overlay.setMap( this.props.map )
    console.log( 'popup did mount' )
  }

  componentDidUpdate(prevProps) {
    const { children, google, map, position } = this.props;
    let newPosition = position instanceof google.maps.LatLng ? position : new google.maps.LatLng( position.lat, position.lng )
    
    if (!google || !map) {
      return;
    }
    
    if (map !== prevProps.map) {
      console.log( 'new map' )
      this.overlay.setMap( map )
    }
    if( ! newPosition.equals( prevProps.position ) ){
      console.log( 'new position', newPosition, prevProps.position )
      this.overlay.position = newPosition
      map.panTo( newPosition )
    }
    if ( children !== prevProps.children) {
      console.log( 'new children')
      this.overlay.children = children
    }
  }
  componentWillUnmount(){
    console.log( 'popup unmounting' )
    if( this.overlay ) this.overlay.setMap( null );
  }
  render() {
    return null;
  }
}

Popup.propTypes = {
  children: PropTypes.element.isRequired,
  map: PropTypes.object,
  marker: PropTypes.object,
  position: PropTypes.object,

  // callbacks
  onClose: PropTypes.func,
  onOpen: PropTypes.func
}

Popup.defaultProps = {
}

export default Popup
