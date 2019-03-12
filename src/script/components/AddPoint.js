/* eslint-disable no-invalid-this */
import React, {Component} from 'react';

/**
 */
export class AddPoint extends Component {
  state = {
    pointName: '',
  };

  /**
  * @param {Event} e
  **/
  submitHandler = (e) => {
    e.preventDefault();

    if (this.props.isRequesting) {
      return;
    }

    const {pointName} = this.state;

    if (pointName === '') {
      return;
    }

    const {lat, lng} = this.props.currentCoord;


    this.props.addPoint(pointName, lat, lng);
    this.setState({pointName: ''});
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
        <input onChange={this.inputHandler} type="text" className="add-point__input" value={this.state.pointName} autoFocus/>
        <button type="submit" className="add-point__submit">Добавить</button>
      </form>
    );
  }
}

export default AddPoint;
