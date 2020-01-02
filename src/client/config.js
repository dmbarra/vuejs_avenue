import axios from "axios";

var URL = "http://localhost:8000/api";
var VERSION = "/v1";

export const http = axios.create({
  baseURL: URL + VERSION
});
