import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "@/client/actions/auth";
import { USER_REQUEST, USER_ERROR } from "@/client/actions/user";
import Token from "@/client/token";

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false,
  userId: localStorage.getItem("user-id") || "1",
  create_at: localStorage.getItem("create_at") || ""
};

const getters = {
  isAuthenticated: state =>
    !!state.token && state.create_at == new Date().getHours(),
  authStatus: state => state.status,
  tokenAuthenticated: state => state.token,
  userIdAuthenticated: state => state.userId
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      Token.generateToken(user.username, user.password)
        .then(resp => {
          localStorage.setItem("user-token", resp.data.token);
          localStorage.setItem("create_at", new Date().getHours());
          localStorage.setItem("user-id", resp.data.userId);
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST, resp.data.userId);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          commit(USER_ERROR);
          localStorage.removeItem("user-token");
          reject(err);
          console.log(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      resolve();
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: state => {
    state.status = "success";
    state.token = localStorage.getItem("user-token");
    state.userId = localStorage.getItem("user-id");
    state.create_at = localStorage.getItem("create_at");
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
    state.userId = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
