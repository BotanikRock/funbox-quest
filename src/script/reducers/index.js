import {combineReducers} from 'redux';
import pointsReducer from './points';
import coordReducer from './coord';


const reducers = combineReducers({
  points: pointsReducer,
  coord: coordReducer,
});

export default reducers;
