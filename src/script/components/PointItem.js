/* eslint-disable no-invalid-this */
import React, {Component} from 'react';

/**
 */
export default class PointItem extends Component {
  /**
  * @param {Event} e
  **/
  clickDeleteHandler = (e) => {
    this.props.removePoint(this.props.index);
  }

  /**
   * @return {JSX}
   */
  render() {
    const {parentClassName, index, name, address} = this.props;

    return (
      <div className={`point ${parentClassName}`} key={index}>
        <div className="point__address">{address}</div>
        <div className="point__index">№{index + 1}</div>
        <div className="point__name">{name}</div>
        <button onClick={this.clickDeleteHandler} className="point__delete"></button>
      </div>
    );
  }
}
