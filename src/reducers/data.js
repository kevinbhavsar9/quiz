import { ADD_DATA_TO_STORE } from "../actions/data";

let initialState = {
  isSubmitted: false,
  count: 0,
};
export default function data(state = initialState, action) {
  switch (action.type) {
    case ADD_DATA_TO_STORE:
      return action.data;

    default:
      return state;
  }
}
