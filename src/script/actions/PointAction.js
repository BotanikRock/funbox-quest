const ADD_POINT_REQUEST = 'ADD_POINT_REQUEST';
const ADD_POINT_SUCCESS = 'ADD_POINT_SUCCESS';
const ADD_POINT_FAIL = 'ADD_POINT_FAIL';
const REMOVE_POINT = 'REMOVE_POINT';
const CHANGE_POINT = 'CHANGE_POINT';
const CHANGE_POINT_ORDER = 'CHANGE_POINT_ORDER';

/**
 */
class AddressRequester {
  /**
   * @param {*} point 
   * @param {*} dispatch
   */
  constructor(point, dispatch) {
    this.point = point;
    this.dispatch = dispatch;
  }

  /**
   */
  request() {
    this.dispatch({
      type: ADD_POINT_REQUEST,
    });

    const {lat, lng} = this.point;

    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({location: {lat, lng}}, (result, status) => {
      if (status !== 'OK') {
        this.dispatch({
          type: ADD_POINT_FAIL,
        });

        return;
      }

      const [approx] = result;
      const address = approx ? approx.formatted_address : 'Адреса нет';

      this.dispatch({
        type: ADD_POINT_SUCCESS,
        payload: {point: {...this.point, address}},
      });
    });
  }
}

const addPoint = (name, lat, lng) => (dispatch) => {
  const requester = new AddressRequester({name, lat, lng}, dispatch);

  requester.request();
};

const removePoint = (pointIndex) => ({
  type: REMOVE_POINT,
  payload: {pointIndex},
});

const changePoint = (pointIndex, newAttrs) => ({
  type: CHANGE_POINT,
  payload: {pointIndex, newAttrs},
});

const changePointOrder = (oldIndex, newIndex) => ({
  type: CHANGE_POINT_ORDER,
  payload: {oldIndex, newIndex},
});

export {
  ADD_POINT_REQUEST,
  ADD_POINT_SUCCESS,
  ADD_POINT_FAIL,
  REMOVE_POINT,
  CHANGE_POINT,
  CHANGE_POINT_ORDER,
  addPoint,
  removePoint,
  changePoint,
  changePointOrder,
};
