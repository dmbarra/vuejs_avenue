import axios from "axios";
import Store from "@/store";

var URL = "http://localhost:8000/api";
var VERSION = "/v1";

export const http = axios.create({
  baseURL: URL + VERSION
});

http.interceptors.request.use(function(config) {
  const token = Store.getters.tokenAuthenticated;
  config.headers.Authorization = token;

  return config;
});
