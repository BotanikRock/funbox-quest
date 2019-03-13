import Component from '../components/Map';
import {changeCurrentCoord} from '../actions/MapAction';
import {changePoint} from '../actions/PointAction';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  return {
    currentCoord: store.map.currentCoord,
    points: store.points.points,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentCoord: (lat, lng) => dispatch(changeCurrentCoord(lat, lng)),
  changePoint: (pointIndex, newAttrs) => dispatch(changePoint(pointIndex, newAttrs)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
