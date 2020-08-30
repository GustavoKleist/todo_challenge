import * as type from "./projectEnum";

const INITIAL_STATE = {
  projects: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;
  }
};
