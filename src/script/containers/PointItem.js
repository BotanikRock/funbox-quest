import Component from '../components/PointItem';
import {removePoint} from '../actions/PointAction';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => ({
  removePoint: (index) => dispatch(removePoint(index)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
