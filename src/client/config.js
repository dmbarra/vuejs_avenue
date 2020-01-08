import axios from "axios";
import Store from "@/store";
import { AUTH_LOGOUT } from "@/client/actions/auth";

var URL = "http://localhost:8000/api";
var VERSION = "/v1";

export const http = axios.create({
  baseURL: URL + VERSION
});

http.interceptors.request.use(function(config) {
  if (Store.getters.tokenAuthenticated) {
    const token = "Token " + Store.getters.tokenAuthenticated;
    config.headers.Authorization = token;
  }

  return config;
});

http.interceptors.response.use(undefined, function(err) {
  return new Promise(function() {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      Store.dispatch(AUTH_LOGOUT);
    }
    throw err;
  });
});
