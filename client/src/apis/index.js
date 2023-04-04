import axios from "axios";
import { ServerBaseUrl } from "../constants/allConstants";

const appApi = axios.create({ baseURL: ServerBaseUrl });

export const UserApis = {
  createUser(userData) {
    return appApi.post("/api/v1/users", userData);
  },
  getUserAll() {
    return appApi.get({
      url: "/api/v1/users",
    });
  },
  getUserById(userId) {
    return appApi.get({
      url: `/api/v1/users/${userId}`,
    });
  },
  updateUserById(userId, userData) {
    return appApi.put({
      url: `/api/v1/users/${userId}`,
      data: userData,
    });
  },
};

// auth api
export const AuthApis = {
    userLogIn(userData) {
        console.log({appApi})
        return appApi.post("/auth/login", userData)
    }, ///api/users/login
    userLogOut(userData) {
      return appApi.post("/auth/logout", userData);
    }
};
