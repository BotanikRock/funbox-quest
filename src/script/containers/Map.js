import Component from '../components/Map';
import {changeCurrentCoord} from '../actions/MapAction';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  return {
    currentCoord: store.map.currentCoord,
    points: store.points.points,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentCoord: (lat, lng) => dispatch(changeCurrentCoord(lat, lng)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
