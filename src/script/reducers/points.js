import {
  ADD_POINT, REMOVE_POINT, CHANGE_POINT_ORDER,
} from '../actions/PointAction';
import {moveItemInArray} from '../helpers';

const initialState = {
  points: [],
};

export default (state = initialState, {type, payload}) => {
  const {points} = state;

  switch (type) {
    case ADD_POINT:
      const {point} = payload;

      return {...state, points: [...points, point]};
    case REMOVE_POINT:
      const {pointIndex: pointIndexToRemove} = payload;

      return {...state,
        points: points.filter(
            (_, pointIndex) => pointIndex !== pointIndexToRemove)};
    case CHANGE_POINT_ORDER:
      const {oldIndex, newIndex} = payload;

      return {...state, points: moveItemInArray(points, oldIndex, newIndex)};
    default:
      return state;
  }
};
