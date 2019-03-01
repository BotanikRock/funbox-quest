/* eslint-disable no-invalid-this */
import React, {Component} from 'react';

/**
 */
export class AddPoint extends Component {
  /**
  * @param {Event} e
  **/
  submitHandler = (e) => {
    e.preventDefault();

    const {pointName} = this.state;

    if (pointName === '') {
      return;
    }

    const {x, y} = this.props.currentCoord;

    this.props.addPoint(pointName, x, y);
  }

  /**
  * @param {Event} e
  **/
  inputHandler = (e) => {
    this.setState({pointName: e.target.value});
  }

  /**
   * @return {JSX}
   */
  render() {
    return (
      <form onSubmit={this.submitHandler} className="add-point">
        <input onChange={this.inputHandler} type="text" className="add-point__input"/>
        <button type="submit" className="add-point__submit">Добавить</button>
      </form>
    );
  }
}

export default AddPoint;
