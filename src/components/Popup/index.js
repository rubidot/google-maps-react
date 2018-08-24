import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

export class Popup extends React.Component {

  componentDidMount() {
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

    if (this.props.position !== prevProps.position) {
      this.updatePosition();
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }

    if ((this.props.visible !== prevProps.visible ||
        this.props.marker !== prevProps.marker ||
        this.props.position !== prevProps.position)) {
        this.props.visible ?
          this.openWindow() :
          this.closeWindow();
    }
  }

  renderPopup() {
    const {
      map,
      google,
      mapCenter,
      ...props
    } = this.props;

    if (!google || !google.maps) {
      return;
    }

    const iw = this.Popup = new google.maps.InfoWindow({
      content: '',
      ...props
    });

    google.maps.event
      .addListener(iw, 'closeclick', this.onClose.bind(this))
    google.maps.event
      .addListener(iw, 'domready', this.onOpen.bind(this));
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  openWindow() {
    this.Popup.open(this.props.map, this.props.marker);
  }

  updatePosition() {
    let pos = this.props.position;
    if (!(pos instanceof google.maps.LatLng)) {
      pos = pos && new google.maps.LatLng(pos.lat, pos.lng);
    }
    this.Popup.setPosition(pos);
  }

  updateContent() {
    const content = this.renderChildren();
    this.Popup.setContent(content);
  }

  closeWindow() {
    this.Popup.close();
  }

  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
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
  visible: PropTypes.bool,

  // callbacks
  onClose: PropTypes.func,
  onOpen: PropTypes.func
}

Popup.defaultProps = {
  visible: false
}

export default Popup
