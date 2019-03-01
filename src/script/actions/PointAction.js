const ADD_POINT = 'ADD_POINT';
const REMOVE_POINT = 'REMOVE_POINT';
const CHANGE_POINT_ORDER = 'CHANGE_POINT_ORDER';

const addPoint = (name, x, y) => ({
  type: ADD_POINT,
  payload: {point: {name, x, y}},
});

const removePoint = (pointIndex) => ({
  type: REMOVE_POINT,
  payload: {pointIndex},
});

const changePointOrder = (oldIndex, newIndex) => ({
  type: CHANGE_POINT_ORDER,
  payload: {oldIndex, newIndex},
});

export {
  ADD_POINT,
  REMOVE_POINT,
  CHANGE_POINT_ORDER,
  addPoint,
  removePoint,
  changePointOrder,
};
