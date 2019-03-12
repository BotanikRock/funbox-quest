import {combineReducers} from 'redux';
import pointsReducer from './points';
import mapReducer from './map';


const reducers = combineReducers({
  points: pointsReducer,
  map: mapReducer,
});

export default reducers;
