import {CHANGE_CURRENT_COORD} from '../actions/MapAction';

const initialState = {
  currentCoord: {lat: 55.753821, lng: 37.619900},
  // TODO откуда брать начальную координату?
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_CURRENT_COORD:
      const {lat, lng} = payload;

      return {...state, currentCoord: {lat, lng}};
    default:
      return state;
  }
};

export default reducer;
