import {combineReducers} from 'redux';
import {reducer as pointsReducer, initialState as mapState} from './points';
import {reducer as mapReducer, initialState as pointState} from './map';


const reducers = combineReducers({
  points: pointsReducer,
  map: mapReducer,
});

const initialState = {...pointState, ...mapState};

export {reducers, initialState};
