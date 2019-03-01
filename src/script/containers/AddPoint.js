import Component from '../components/AddPoint';
import {addPoint} from '../actions/PointAction';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  return {
    currentCoord: store.coord.currentCoord,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addPoint: (name, x, y) => dispatch(addPoint(name, x, y)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
