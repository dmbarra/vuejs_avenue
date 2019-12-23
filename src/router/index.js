import Vue from "vue";
import VueRouter from "vue-router";
import Starter from "@/pages/HomePage.vue";
import LandingNavbar from "@/layout/LandingNavbar.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import Login from "@/pages/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    components: {
      default: Starter,
      header: LandingNavbar
    },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: "/login",
    name: "login",
    components: { default: Login, header: MainNavbar },
    props: {
      header: { colorOnScroll: 400 }
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
