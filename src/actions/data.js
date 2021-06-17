export const ADD_DATA_TO_STORE = "ADD_DATA_TO_STORE";
export function addDataToStore(data) {
  return {
    type: ADD_DATA_TO_STORE,
    data,
  };
}
