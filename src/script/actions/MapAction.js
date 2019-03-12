const CHANGE_CURRENT_COORD = 'CHANGE_CURRENT_COORD';

const changeCurrentCoord = ({lat, lng}) => ({
  type: CHANGE_CURRENT_COORD,
  payload: {lat, lng},
});

export {
  CHANGE_CURRENT_COORD,
  changeCurrentCoord,
};
