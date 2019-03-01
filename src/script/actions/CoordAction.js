const CHANGE_CURRENT_COORD = 'CHANGE_CURRENT_COORD';

const changeCurrentCoord = (x, y) => ({
  type: CHANGE_CURRENT_COORD,
  payload: {x, y},
});

export {
  CHANGE_CURRENT_COORD,
  changeCurrentCoord,
};
