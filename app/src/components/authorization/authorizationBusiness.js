import api from "../services/api";
import AuthorizationStorage from "./authorizationStorage";
import Swal from "sweetalert2";

export const createUser = (values) => {
  return new Promise((resolve, reject) => {
    api
      .post("user/signup", values)
      .then(() => {
        Swal.fire("Success!", "User created.", "success");
        resolve(true);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Something went wrong.", "error");
        reject(err);
      });
  });
};

export const loginUser = (values) => {
  return new Promise((resolve, reject) => {
    api
      .post("user/login", values)
      .then((resp) => {
        AuthorizationStorage.setUserInfo(resp.data);
        resolve(resp);
      })
      .catch((err) => {
        Swal.fire("Ops!", "Email or Password mismatch.", "error");
        reject(err);
      });
  });
};

export const isAuthenticated = () => {
  if (AuthorizationStorage.getUserInfo() === undefined) {
    return false;
  } else {
    return true;
  }
};

export const getToken = () => {
  return AuthorizationStorage.getUserInfo();
};

export const revokeToken = () => {
  return AuthorizationStorage.revokeUserInfo();
};
