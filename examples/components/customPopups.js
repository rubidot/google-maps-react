import React, { Component } from 'react';

import Map from '../../src/index';

import Popup from '../../src/components/Popup';
import Marker from '../../src/components/Marker';

class WithPopups extends Component {
  state = {
    selectedPlace: {}
  };

  onMarkerClick = (props, marker) =>{
    this.setState({
      position: marker.position,
      selectedPlace: props
    });}

  onMapClicked = () => this.setState({ position: null });

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

        { this.state.position && <Popup position={ this.state.position } >
          <div style={{ background: 'white', position: 'absolute', bottom: '5em', left: '-6em', padding: '1em', width: '10em' }}>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </Popup> }

        { false && <Popup position={{ lat: 37.765703, lng: -122.42564 }} >
          <h1 style={{ background: 'white', position: 'absolute', bottom: 0, padding: '1em', width: '10em' }}>
            Just a floating popup.
          </h1>
        </Popup>}
      </Map>
    );
  }
}

export default WithPopups;
