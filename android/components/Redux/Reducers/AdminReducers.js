import { ADD_ADMIN_DATA } from "../Actions/types";

const initialState = {
  adminData: {},
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADMIN_DATA:
      return { ...state, adminData: action.payload };

    default:
      return state;
  }
};

export default Reducers;
