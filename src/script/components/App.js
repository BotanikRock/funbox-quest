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
      <div className="wrapper" key="main">
        <div className="half-wrapper half-wrapper--right">
          <AddPoint/>
          <PointList/>
        </div>
      </div>,
      <Map key="map"/>,
    ];
  }
}


export default App;
