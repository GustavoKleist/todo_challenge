import { Reducer } from "redux-testkit";
import * as types from "../components/authorization/authorizationEnum";
import authorizationReducer from "../components/authorization/authorizationReducer";
import initialState from "./initialState";
import expect from "expect";
import mockAuthorization from "./mockjson/mockAuthorization";

describe("Authorization Reducer Test", () => {
  it("Shoud have initial state", () => {
    expect(authorizationReducer(initialState.authorization, {})).toEqual(
      initialState.authorization
    );
  });

  it("Should have user data filed in state", () => {
    const valueFromAction = {
      email: "teste@teste.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsInVzZXJJZCI6IjVmNDljYzZhYjVhOThkMzE4MGNjNDk3OCIsImlhdCI6MTU5ODgxOTYzOCwiZXhwIjoxNTk4ODIzMjM4fQ.GM601u3xbCQiaCPFcRwlc_aXoDfyqBuyEWbC6x1qJOY"
    };

    const action = { type: types.LOGIN, payload: mockAuthorization.data };
    Reducer(authorizationReducer)
      .withState(initialState.authorization)
      .expect(action)
      .toReturnState(valueFromAction);
  });

  it("Should not have user data filed in state", () => {
    const valueFromAction = {};

    const action = { type: types.LOGIN_ERROR, payload: {} };
    Reducer(authorizationReducer)
      .withState(initialState.authorization)
      .expect(action)
      .toReturnState(valueFromAction);
  });
});
