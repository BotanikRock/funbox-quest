/* eslint-disable no-invalid-this */
import React, {Component} from 'react';

/**
 */
export default class PointItem extends Component {
  state = {
    modClassName: null,
  }

  /**
   * @param {MouseEvent} event
   * @return {Object}
   */
  getElementMiddleAndCurPosY(event) {
    const {target, clientY} = event;

    const middleHeight = target.offsetHeight / 2;
    const rect = target.getBoundingClientRect();
    const posY = clientY - rect.top;

    return {middleHeight, posY, target};
  }

  /**
  * @param {Event} e
  **/
  clickDeleteHandler = (e) => {
    this.props.removePoint(this.props.index);
  }

  /**
  * @param {Event} e
  **/
  dragStart = (e) => {
    e.dataTransfer.setData('text', this.props.index);
  }

  dragOver = (e) => {
    e.preventDefault();
    const {middleHeight, posY} = this.getElementMiddleAndCurPosY(e);

    const modClassName = posY < middleHeight ? 'point--insert-before' : 'point--insert-after';
    
    this.setState({modClassName});
  }

  dragLeave = (e) => {
    this.setState({modClassName: null});
  }

  drop = (e) => {
    const oldIndex = Number.parseInt(e.dataTransfer.getData('text'));

    const {middleHeight, posY} = this.getElementMiddleAndCurPosY(e);

    const newIndex = posY < middleHeight ? this.props.index : this.props.index + 1;

    this.setState({modClassName: null});

    if (oldIndex === newIndex) {
      return;
    }

    this.props.changePointOrder(oldIndex, newIndex);
  }

  /**
   * @return {JSX}
   */
  render() {
    const {parentClassName, index, name, address} = this.props;
    const {modClassName} = this.state;

    const className = modClassName ? `point ${modClassName}` : 'point';

    return (
      <div
        className={`${className} ${parentClassName}`}
        draggable
        onDragStart={this.dragStart}
        onDragOver={this.dragOver}
        onDragLeave={this.dragLeave}
        onDrop={this.drop}>
        <div className="point__address">{address}</div>
        <div className="point__index">№{index + 1}</div>
        <div className="point__name">{name}</div>
        <button onClick={this.clickDeleteHandler} className="point__delete"></button>
      </div>
    );
  }
}
