import {types} from '../actions';

const initialState = {
  detailDayWork: {},
  listDayWork: [],
};

export default function dayWorkReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_DAY_WORK: {
      return Object.assign({}, state, {
        detailDayWork: action.data,
      });
    }
    case types.SAVE_LIST_DAY_WORK: {
      return Object.assign({}, state, {
        listDayWork: action.data,
      });
    }
    default:
      return state;
  }
}