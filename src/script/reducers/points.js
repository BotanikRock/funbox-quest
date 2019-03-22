import {
  ADD_POINT_REQUEST, ADD_POINT_SUCCESS, REMOVE_POINT, CHANGE_POINT_ORDER, CHANGE_POINT_SUCCESS,
} from '../actions/PointAction';
import {moveItemInArray} from '../helpers';

const initialState = {
  points: [],
  isRequesting: false,
};

const reducer = (state = initialState, {type, payload}) => {
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

    case CHANGE_POINT_SUCCESS:
      const {pointIndex, newAttrs} = payload;

      return {...state, points: points.map((point, index) =>
        index === pointIndex ? {...point, ...newAttrs} : point
      )};

    case CHANGE_POINT_ORDER:
      const {oldIndex, newIndex} = payload;

      const rearrangedPoints = moveItemInArray(points, oldIndex, newIndex);

      return {...state, points: rearrangedPoints};
    default:
      return state;
  }
};

export {initialState, reducer};
