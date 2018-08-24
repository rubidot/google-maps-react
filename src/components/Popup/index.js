import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import GetOverlay from './overlay'

export class Popup extends React.Component {

  componentDidMount() {
    this.anchor = React.createRef()
    this.renderPopup();
  }

  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    
    if (!google || !map) {
      return;
    }
    
    if (map !== prevProps.map) {
      this.renderPopup();
    }
  }

  renderPopup() {
    const {
      map,
      google,
      mapCenter,
      ...props
    } = this.props;

    if (!google || !google.maps ) {
      return;
    }
    
    const Overlay = GetOverlay( google )
    this.overlay = new Overlay( props, this.anchor )
    this.overlay.setMap( map )
  }

  openWindow() {
    this.Popup.open(this.props.map, this.props.marker);
  }

  render() {
    return <div ref={ this.anchor } style={ {position:'absolute'} }>{this.props.children}</div>;
  }
}

Popup.propTypes = {
  children: PropTypes.element.isRequired,
  map: PropTypes.object,
  marker: PropTypes.object,
  position: PropTypes.object,
  visible: PropTypes.bool,

  // callbacks
  onClose: PropTypes.func,
  onOpen: PropTypes.func
}

Popup.defaultProps = {
  visible: false
}

export default Popup
