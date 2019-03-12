import Component from '../components/PointList';
import {removePoint} from '../actions/PointAction';
import {connect} from 'react-redux';

const mapStateToProps = (store) => ({
  points: store.points.points,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
