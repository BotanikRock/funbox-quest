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
        {this.props.points.map(({name}, index) =>
          <Point name={name} index={index} parentClassName="point-list__item"/>
        )}
      </div>
    );
  }
}
