import React from 'react'
// Export a function that returns the class, because it must be created after google is loaded
export default ( google ) => {
	return class Overlay extends google.maps.OverlayView {
		constructor( props ){
			super()
			this.position = props.position;
			this.children = props.children;
			this.marker    = props.marker;
			this.anchor = <div>TESTING</div>
		}
		draw = () => {
	    // var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
	    // // Hide the popup when it is far out of view.
	    // var display =
	    //     Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
	    //     'block' :
	    //     'none';
			// 
	    // if (display === 'block') {
	    //   this.anchor.style.left = divPosition.x + 'px';
	    //   this.anchor.style.top = divPosition.y + 'px';
	    // }
	    // if (this.anchor.style.display !== display) {
	    //   this.anchor.style.display = display;
	    // }
	  }
		onAdd(){
	    // this.getPanes().floatPane.appendChild(this.anchor);
	  }
	}
}