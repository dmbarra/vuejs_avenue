import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import NowUiKit from "@/plugins/now-ui-kit";
import BootstrapVue from "bootstrap-vue";

Vue.config.productionTip = false;

Vue.use(NowUiKit);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
