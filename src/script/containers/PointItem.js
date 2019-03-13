import Component from '../components/PointItem';
import {removePoint, changePointOrder} from '../actions/PointAction';
import {connect} from 'react-redux';

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({
  removePoint: (index) => dispatch(removePoint(index)),
  changePointOrder: (oldIndex, newIndex) => dispatch(changePointOrder(oldIndex, newIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
