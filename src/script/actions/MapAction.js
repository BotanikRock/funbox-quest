const CHANGE_CURRENT_COORD = 'CHANGE_CURRENT_COORD';
const BUILD_ROUTE_REQUEST = 'BUILD_ROUTE_REQUEST';
const BUILD_ROUTE_SUCCESS = 'BUILD_ROUTE_SUCCESS';
const BUILD_ROUTE_FAIL = 'BUILD_ROUTE_FAIL';

/**
 */
class RouteRequester {
  /**
   * @param {Array} points
   * @param {Function} dispatch
   */
  constructor(points, dispatch) {
    this.points = points;
    this.dispatch = dispatch;
  }

  /**
   * @return {*}
   */
  request() {
    this.dispatch({
      type: BUILD_ROUTE_REQUEST,
    });

    const {points} = this;

    const DirectionsService = new google.maps.DirectionsService();

    const [beginroute] = points;
    const [endRoute] = points.slice(-1);

    const waypoints = points.slice(1, points.length - 1);

    if (!beginroute) {
      this.dispatch({
        type: BUILD_ROUTE_SUCCESS,
        payload: {directions: null},
      });

      return;
    }

    const requestOptions = {
      origin: new google.maps.LatLng(beginroute.lat, beginroute.lng),
      destination: new google.maps.LatLng(endRoute.lat, endRoute.lng),
      waypoints: waypoints.map(({lat, lng}) =>
        ({location: new google.maps.LatLng(lat, lng)})),
      travelMode: google.maps.TravelMode.WALKING,
    };

    return new Promise((resolve) => {
      DirectionsService.route(requestOptions, (result) => {
        this.dispatch({
          type: BUILD_ROUTE_SUCCESS,
          payload: {directions: result},
        });
      });

      resolve();
    });
  }
}

const changeCurrentCoord = ({lat, lng}) => ({
  type: CHANGE_CURRENT_COORD,
  payload: {lat, lng},
});

const buildRoute = (points) => (dispatch) => {
  const requester = new RouteRequester(points, dispatch);

  return requester.request();
};

export {
  CHANGE_CURRENT_COORD,
  BUILD_ROUTE_REQUEST,
  BUILD_ROUTE_SUCCESS,
  BUILD_ROUTE_FAIL,
  changeCurrentCoord,
  buildRoute,
};
