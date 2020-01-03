import Vue from "vue";
import Vuex from "vuex";
import user from "@/client/modules/user";
import auth from "@/client/modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    auth
  }
});
