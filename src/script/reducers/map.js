import {
  CHANGE_CURRENT_COORD,
  BUILD_ROUTE_SUCCESS,
} from '../actions/MapAction';

const initialState = {
  currentCoord: {lat: 55.753821, lng: 37.619900},
  directions: null,
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_CURRENT_COORD:
      const {lat, lng} = payload;

      return {...state, currentCoord: {lat, lng}};
    case BUILD_ROUTE_SUCCESS:
      const {directions} = payload;
      
      return {...state, directions};
    default:
      return state;
  }
};

export {initialState, reducer};
