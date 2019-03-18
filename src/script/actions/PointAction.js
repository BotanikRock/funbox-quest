import {buildRoute} from './MapAction';

const ADD_POINT_REQUEST = 'ADD_POINT_REQUEST';
const ADD_POINT_SUCCESS = 'ADD_POINT_SUCCESS';
const ADD_POINT_FAIL = 'ADD_POINT_FAIL';
const CHANGE_POINT_REQUEST = 'CHANGE_POINT_REQUEST';
const CHANGE_POINT_SUCCESS = 'CHANGE_POINT_SUCCESS';
const CHANGE_POINT_FAIL = 'CHANGE_POINT_FAIL';
const REMOVE_POINT = 'REMOVE_POINT';
const CHANGE_POINT_ORDER = 'CHANGE_POINT_ORDER';

/**
 */
class AddressRequester {
  /**
   * @param {*} pointInfo
   * @param {*} dispatch
   * @param {*} getState
   */
  constructor(pointInfo, dispatch, getState) {
    this.pointInfo = pointInfo;
    this.dispatch = dispatch;
    this.getState = getState;

    this.config = {
      add: {
        requestAction: ADD_POINT_REQUEST,
        failAction: ADD_POINT_FAIL,
        successAction: ADD_POINT_SUCCESS,
        payloadFunc: (point) => ({point}),
      },
      change: {
        requestAction: CHANGE_POINT_REQUEST,
        failAction: CHANGE_POINT_FAIL,
        successAction: CHANGE_POINT_SUCCESS,
        payloadFunc: (point) => {
          const {pointIndex, lat, lng, address} = point;

          return {pointIndex, newAttrs: {lat, lng, address}};
        },
      },
    };
  }

  /**
   * @param {String} type
   * @return {Promise}
   */
  request(type) {
    const {requestAction, failAction, successAction, payloadFunc} = this.config[type];

    this.dispatch({
      type: requestAction,
    });

    const {lat, lng} = this.pointInfo;

    const geocoder = new google.maps.Geocoder;

    return new Promise((resolve, reject) => {
      geocoder.geocode({location: {lat, lng}}, (result, status) => {
        if (status !== 'OK') {
          this.dispatch({
            type: failAction,
          });

          reject();

          return;
        }

        const [approx] = result;
        const address = approx ? approx.formatted_address : 'Адреса нет';
        const point = {...this.pointInfo, address};

        this.dispatch({
          type: successAction,
          payload: payloadFunc(point),
        });

        resolve(this.getState().points.points);
      });
    });
  }
}

const addPoint = (name, lat, lng) => (dispatch, getState) => {
  const requester = new AddressRequester({name, lat, lng}, dispatch, getState);

  requester.request('add')
      .then((points) => dispatch(buildRoute(points)));
};

const changePoint = (pointIndex, newAttrs) => (dispatch, getState) => {
  const requester = new AddressRequester({pointIndex, ...newAttrs}, dispatch, getState);

  requester.request('change')
      .then((points) => dispatch(buildRoute(points)));
};

const removePoint = (pointIndex) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_POINT,
    payload: {pointIndex},
  });

  dispatch(buildRoute(getState().points.points));
};

const changePointOrder = (oldIndex, newIndex) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_POINT_ORDER,
    payload: {oldIndex, newIndex},
  });

  dispatch(buildRoute(getState().points.points));
};

export {
  ADD_POINT_REQUEST,
  ADD_POINT_SUCCESS,
  ADD_POINT_FAIL,
  CHANGE_POINT_REQUEST,
  CHANGE_POINT_SUCCESS,
  CHANGE_POINT_FAIL,
  REMOVE_POINT,
  CHANGE_POINT_ORDER,
  addPoint,
  removePoint,
  changePoint,
  changePointOrder,
};
