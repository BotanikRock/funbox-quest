import Component from '../components/AddPoint';
import {addPoint} from '../actions/PointAction';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  return {
    currentCoord: store.map.currentCoord,
    isRequesting: store.points.isRequesting,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addPoint: (name, lat, lng) => dispatch(addPoint(name, lat, lng)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
