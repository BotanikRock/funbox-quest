/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {compose, withProps} from 'recompose';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer,
} from 'react-google-maps';

/**
 */
class MarkerWithInfo extends React.Component {
  state = {
    showInfo: false,
  }

  show = () => {
    this.setState({
      showInfo: true,
    });
  }

  hide = () => {
    this.setState({
      showInfo: false,
    });
  }

  dragEnd = (e) => {
    const newPos = e.latLng.toJSON();

    this.props.changePos(newPos);
  }

  /**
   * @return {JSX}
   */
  render() {
    const {lat, lng, pos, info} = this.props;

    return (<Marker
      onDragEnd={this.dragEnd}
      draggable={true}
      onClick={this.show}
      position={{lat, lng}}
      label={`${pos}`}>
      {this.state.showInfo ? <InfoWindow
        onCloseClick={this.hide}>
        <span>{info}</span>
      </InfoWindow> : null}
    </Marker>);
  }
};

/**
 */
class Map extends Component {
  state = {
    directions: null,
    markers: [],
  }

  /**
  **/
 setCoord = () => {
   const center = this._map.getCenter().toJSON();
   this.props.changeCurrentCoord(center);
 }


 /**
  * @param {Array} markerOptions
  * @return {Array}
  */
 buildMarkers(markerOptions) {
   const markers = markerOptions.map((markerOpt, index) => {
     const {lat, lng} = markerOpt.toJSON();

     const props =
      {lat, lng, pos: index + 1, info: this.props.points[index].name};

     return <MarkerWithInfo
       key={index}
       changePos={(newPos) => this.props.changePoint(index, newPos)}
       {...props}/>;
   });

   return markers;
 }

 /**
  * @param {Object} nextProps
  * @return {Boolean}
  */
 shouldComponentUpdate(nextProps) {
   if (this.props.points !== nextProps.points) {
     return true;
   }
   return false;
 }

 /**
  * @param {*} prevProps
  */
 componentDidUpdate(prevProps) {
   const {points} = this.props;

   if (points == prevProps.points || points.length === 0) {
     return;
   }

   const DirectionsService = new google.maps.DirectionsService();

   const [beginroute] = points;
   const [endRoute] = points.slice(-1);

   const waypoints = points.slice(1, points.length - 1);

   const requestOptions = {
     origin: new google.maps.LatLng(beginroute.lat, beginroute.lng),
     destination: new google.maps.LatLng(endRoute.lat, endRoute.lng),
     waypoints: waypoints.map(({lat, lng}) =>
       ({location: new google.maps.LatLng(lat, lng)})),
     travelMode: google.maps.TravelMode.WALKING,
   };

   const directionOptions = {
     suppressMarkers: true,
   };

   DirectionsService.route(requestOptions, (result) => {
     const markerOptions = result.routes[0].legs.reduce((acc, cur, index, orig) => {
       const {start_location: startPoint, end_location: endPoint} = cur;

       const points = index === orig.length - 1 ?
        [startPoint, endPoint] :
        [startPoint];

       return [...acc, ...points];
     }, []);

     const markers = this.buildMarkers(points.length === 1 ? [markerOptions[0]] : markerOptions);

     this.setState({
       directions: points.length <= 1 ? null : result,
       directionOptions,
       markers: points.length === 0 ? null : markers,
     });

     this.forceUpdate();
   });
 }

 /**
   * @return {JSX}
   */
 render() {
   const {points, currentCoord: {lat, lng}} = this.props;
   const {directions, markers} = this.state;

   return (
     <GoogleMap
       options={{disableDefaultUI: true}}
       defaultZoom={8}
       defaultCenter={{lat, lng}}
       ref={(map) => this._map = map}
       onCenterChanged={this.setCoord}>
       {directions && <DirectionsRenderer
         directions={this.state.directions}
         options={this.state.directionOptions}/>}
       {points.length !== 0 ? markers : null}
     </GoogleMap>
   );
 }
}

export default compose(
    withProps({
      googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4SWDrb12SHnejSSR2s9GskzXY-slyNks',
      loadingElement: <div style={{height: `100%`}} />,
      containerElement: <div className="map" />,
      mapElement: <div style={{height: `100%`}} />,
    }),
    withScriptjs,
    withGoogleMap,
)(Map);
