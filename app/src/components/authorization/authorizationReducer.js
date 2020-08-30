import * as type from "./authorizationEnum";

const INITIAL_STATE = {
  email: "",
  token: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token
      };
    case type.LOGIN_ERROR:
      return {};
    default:
      return state;
  }
};
