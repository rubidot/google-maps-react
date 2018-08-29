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
  }

  componentDidUpdate(prevProps) {
    const { children, google, map, position } = this.props;
    
    if (!google || !map) {
      return;
    }
    
    if (map !== prevProps.map) {
      this.overlay.setMap( map )
    }
    if( position !== prevProps.position ){
      this.overlay.setMap( null )
      this.overlay.position = position
      this.overlay.setMap( map )
      map.panTo( position )
    }
    if ( children !== prevProps.children) {
      this.overlay.children = children
    }
  }
  componentWillUnmount(){
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
