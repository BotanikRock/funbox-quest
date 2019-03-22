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
  * @param {Array} directions
  * @return {Array}
  */
 buildMarkers(directions) {
   const {points} = this.props;

   return directions.routes[0].legs.reduce((acc, cur, index, orig) => {
     const {start_location: startLocation, end_location: endLocation} = cur;

     const p = index === orig.length - 1 && (index !== 0 || points.length === 2);

     const markerLocation = p ?
      [startLocation, endLocation] :
      [startLocation];

     return [...acc, ...markerLocation];
   }, []).map((markerOpt, index) => {
     const {lat, lng} = markerOpt.toJSON();

     const props =
      {lat, lng, pos: index + 1, info: points[index].name};

     return <MarkerWithInfo
       key={index}
       changePos={(newPos) => this.props.changePoint(index, newPos)}
       {...props}/>;
   });
 }

 /**
  * @param {Object} nextProps
  * @return {Boolean}
  */
 shouldComponentUpdate(nextProps) {
   if (this.props.directions !== nextProps.directions) {
     return true;
   }
   return false;
 }

 /**
   * @return {JSX}
   */
 render() {
   const {directions, currentCoord: {lat, lng}} = this.props;

   const directionOptions = {
     suppressMarkers: true,
   };

   const markers = directions ? this.buildMarkers(directions) : null;

   return (
     <GoogleMap
       options={{disableDefaultUI: true}}
       defaultZoom={8}
       defaultCenter={{lat, lng}}
       ref={(map) => this._map = map}
       onCenterChanged={this.setCoord}>
       {directions && markers.length > 1 && <DirectionsRenderer
         directions={this.props.directions}
         options={directionOptions}/>}
       {markers}
     </GoogleMap>
   );
 }
}

/**
 * Поскольку относится только к карте, решил не выносить в отдельный файл
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

  /**
   * @param {Event} e
   */
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

export default compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API.GM}`,
      loadingElement: <div style={{height: `100%`}} />,
      containerElement: <div className="map" />,
      mapElement: <div style={{height: `100%`}} />,
    }),
    withScriptjs,
    withGoogleMap,
)(Map);
