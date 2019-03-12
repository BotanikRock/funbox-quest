import React, {Component} from 'react';
import Point from '../containers/PointItem';

/**
 */
export default class PointList extends Component {
  /**
   * @return {JSX}
   */
  render() {
    return (
      <div className="point-list">
        {this.props.points.map(({name, address}, index) =>
          <Point
            key={`${name}-${index}`}
            name={name} index={index} address={address}
            parentClassName="point-list__item"/>
        )}
      </div>
    );
  }
}
