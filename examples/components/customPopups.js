import React, { Component } from 'react';

import Map from '../../src/index';

import Popup from '../../src/components/Popup';
import Marker from '../../src/components/Marker';

class WithMarkers extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingPopup: false
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingPopup: true
    });

  onPopupClose = () =>
    this.setState({
      activeMarker: null,
      showingPopup: false
    });

  onMapClicked = () => {
    if (this.state.showingPopup)
      this.setState({
        activeMarker: null,
        showingPopup: false
      });
  };

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '100%', position: 'relative', width: '100%' }}
        zoom={14}>
        <Marker
          name="SOMA"
          onClick={this.onMarkerClick}
          position={{ lat: 37.778519, lng: -122.40564 }}
        />

        <Marker
          name="Dolores park"
          onClick={this.onMarkerClick}
          position={{ lat: 37.759703, lng: -122.428093 }}
        />

        <Marker name="Current location" onClick={this.onMarkerClick} />

        <Popup
          marker={this.state.activeMarker}
          onClose={this.onPopupClose}
          visible={this.state.showingPopup}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </Popup>

        <Popup position={{ lat: 37.765703, lng: -122.42564 }} visible>
          <small>
            Click on any of the markers to display an additional info.
          </small>
        </Popup>
      </Map>
    );
  }
}

export default WithMarkers;
