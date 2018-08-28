import React from 'react'
import ReactDOM from 'react-dom'
// Export a function that returns the class, because it must be created after google is loaded
export default ( google ) => {
	return class Overlay extends google.maps.OverlayView {
		get position(){
			return this._position;
		}
		set position( position ){
			this._position = position instanceof google.maps.LatLng ? position : new google.maps.LatLng( position.lat, position.lng );
		}
		set children( children ){
			console.log( 'setting children', children )
			ReactDOM.render( <div style={ {position:'absolute'} }>{children}</div>, this.anchor)
		}
		constructor( { position, children, ...props} ){
			super()
			this.position = position
			this.anchor   = document.createElement( 'div' );
			this.anchor.style.position='absolute'
			this.children = children
			this.marker   = props.marker;
		}
		draw = () => {
	    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
	    // Hide the popup when it is far out of view.
	    var display =
	        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
	        'block' :
	        'none';
			
	    if (display === 'block') {
	      this.anchor.style.left = divPosition.x + 'px';
	      this.anchor.style.top = divPosition.y + 'px';
	    }
	    if (this.anchor.style.display !== display) {
	      this.anchor.style.display = display;
	    }
	  }
		onAdd(){
	    this.getPanes().floatPane.appendChild(this.anchor);
	  }
		onRemove(){
			if (this.anchor.parentElement) {
	      this.anchor.parentElement.removeChild(this.anchor);
	    }
		}
	}
}