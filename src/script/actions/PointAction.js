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
   */
  constructor(pointInfo, dispatch) {
    this.pointInfo = pointInfo;
    this.dispatch = dispatch;

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
   */
  request(type) {
    const {requestAction, failAction, successAction, payloadFunc} = this.config[type];

    this.dispatch({
      type: requestAction,
    });

    const {lat, lng} = this.pointInfo;

    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({location: {lat, lng}}, (result, status) => {
      if (status !== 'OK') {
        this.dispatch({
          type: failAction,
        });

        return;
      }

      const [approx] = result;
      const address = approx ? approx.formatted_address : 'Адреса нет';
      const point = {...this.pointInfo, address};

      this.dispatch({
        type: successAction,
        payload: payloadFunc(point),
      });
    });
  }
}

const addPoint = (name, lat, lng) => (dispatch) => {
  const requester = new AddressRequester({name, lat, lng}, dispatch);

  requester.request('add');
};

const changePoint = (pointIndex, newAttrs) => (dispatch) => {
  const requester = new AddressRequester({pointIndex, ...newAttrs}, dispatch);

  requester.request('change');
};

const removePoint = (pointIndex) => ({
  type: REMOVE_POINT,
  payload: {pointIndex},
});

const changePointOrder = (oldIndex, newIndex) => ({
  type: CHANGE_POINT_ORDER,
  payload: {oldIndex, newIndex},
});

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
