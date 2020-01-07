import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "@/client/actions/user";
import { AUTH_LOGOUT } from "@/client/actions/auth";
import Vue from "vue";
import Users from "@/client/users";

const state = { status: "", profile: {} };

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }, id) => {
    commit(USER_REQUEST);
    Users.retrieveUser(id)
      .then(resp => {
        commit(USER_SUCCESS, resp);
      })
      .catch(resp => {
        console.log(resp);
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp);
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
