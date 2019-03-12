import {
  ADD_POINT_REQUEST, ADD_POINT_SUCCESS, REMOVE_POINT, CHANGE_POINT_ORDER, CHANGE_POINT,
} from '../actions/PointAction';
import {moveItemInArray} from '../helpers';

const initialState = {
  points: [],
  isRequesting: false,
};

export default (state = initialState, {type, payload}) => {
  const {points} = state;

  switch (type) {
    case ADD_POINT_REQUEST:
      return {...state, isRequesting: true};
    case ADD_POINT_SUCCESS:
      const {point: newPoint} = payload;

      return {...state, isRequesting: false, points: [...points, newPoint]};
    case REMOVE_POINT:
      const {pointIndex: pointIndexToRemove} = payload;

      return {...state,
        points: points.filter(
            (_, pointIndex) => pointIndex !== pointIndexToRemove)};

    case CHANGE_POINT:
      const {pointIndex, newAttrs} = payload;

      return {...state, points: points.map((point, index) =>
        index === pointIndex ? {...point, ...newAttrs} : point
      )};

    case CHANGE_POINT_ORDER:
      const {oldIndex, newIndex} = payload;

      return {...state, points: moveItemInArray(points, oldIndex, newIndex)};
    default:
      return state;
  }
};
