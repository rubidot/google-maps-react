import React from 'react'
import ReactDOMServer from 'react-dom/server'
// Export a function that returns the class, because it must be created after google is loaded
export default ( google ) => {
	return class Overlay extends google.maps.OverlayView {
		constructor( { position, ...props}, ref ){
			super()
			this.position = position instanceof google.maps.LatLng ? position : new google.maps.LatLng( position.lat, position.lng );
			this.children = props.children;
			this.anchor   = ref.current;
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
	}
}