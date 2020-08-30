import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default class AuthorizationStorage {
  static setUserInfo(info) {
    cookies.set("userInfo", info, { maxAge: 3600 });
  }
  static getUserInfo() {
    return cookies.get("userInfo");
  }
  static revokeUserInfo() {
    return cookies.remove("userInfo");
  }
}
