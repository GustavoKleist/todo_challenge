import MockAdapter from "axios-mock-adapter";
import {
  createUser,
  loginUser,
  isAuthenticated,
  revokeToken
} from "../components/authorization/authorizationBusiness";
import AuthorizaztionStorage from "../components/authorization/authorizationStorage";
import axios from "axios";
import expect from "expect";
import mockAuthorization from "./mockjson/mockAuthorization";
const mock = new MockAdapter(axios);

describe("Athorization Business test", () => {
  it("Should create user", () => {
    mock.onPost("/api/v1/user/signup").reply(201, true);
    createUser({ email: "teste@teste.com", password: "123" }).then((res) => {
      expect(res).toEqual(true);
    });
  });

  it("Should not create user", () => {
    mock.onPost("/api/v1/user/signup").reply(400, false);
    createUser({ email: "testestcom", password: "123" }).catch((err) => {
      expect(err).toEqual(false);
    });
  });

  it("Should login user", () => {
    mock.onGet("/api/v1/user/login").reply(200, mockAuthorization);
    loginUser({ email: "teste@teste.com", password: "123" }).then((res) => {
      expect(res).toEqual(mockAuthorization);
    });
  });

  it("Should not login user", () => {
    mock.onGet("/api/v1/user/login").reply(400, false);
    loginUser({ email: "tesom", password: "213" }).catch((err) => {
      expect(err).toEqual(false);
    });
  });
});

describe("Authorization Storage test", () => {
  it("User is not authorized", async () => {
    expect(isAuthenticated()).toBeFalsy();
  });

  it("User id authorized  ", async () => {
    AuthorizaztionStorage.setUserInfo(mockAuthorization);

    await expect(isAuthenticated()).toBeTruthy();
  });

  it("User revoke token  ", async () => {
    AuthorizaztionStorage.setUserInfo(mockAuthorization);

    await expect(isAuthenticated()).toBeTruthy();

    revokeToken();

    await expect(isAuthenticated()).toBeFalsy();
  });
});
