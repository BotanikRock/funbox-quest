import Component from '../components/Map';
import {changeCurrentCoord} from '../actions/CoordAction';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  return {
    currentCoord: store.coord.currentCoord,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentCoord: (x, y) => dispatch(changeCurrentCoord(x, y)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
