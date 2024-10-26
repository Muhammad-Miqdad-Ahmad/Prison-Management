import { ADD_MODE } from "../Actions/types";

const initialState = {
  mode: "yada",
};

const ModeReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MODE:
      return { ...state, mode: action.payload };

    default:
      return state;
  }
};

export default ModeReducers;
