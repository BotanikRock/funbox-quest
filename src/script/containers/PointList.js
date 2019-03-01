import Component from '../components/PointList';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  return {
    points: store.points.points,
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
