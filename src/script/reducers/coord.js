import {CHANGE_CURRENT_COORD} from '../actions/CoordAction';

const initialState = {
  currentCoord: {x: 55.753821, y: 37.619900},
  // TODO откуда брать начальную координату?
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_CURRENT_COORD:
      const {x, y} = payload;

      return {...state, currentCoord: {x, y}};
    default:
      return state;
  }
};

export default reducer;
