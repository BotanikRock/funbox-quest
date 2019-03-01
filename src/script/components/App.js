import React from 'react';

import AddPoint from '../containers/AddPoint';
import PointList from '../containers/PointList';
import Map from '../containers/Map';

/**
 */
class App extends React.Component {
  /**
   * @return {JSX}
   */
  render() {
    return [
      <div className="wrapper">
        <div className="half-wrapper">
          <AddPoint/>
          <PointList/>
        </div>
      </div>,
      <div className="map-container">
        <Map/>
      </div>,
    ];
  }
}


export default App;
