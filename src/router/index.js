import Vue from "vue";
import VueRouter from "vue-router";
import Starter from "@/pages/HomePage.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import Login from "@/pages/Login.vue";
import Tasks from "@/pages/Tasks.vue";
import Bugs from "@/pages/Bugs.vue";
import SignupForm from "@/pages/SignupForm.vue";
import Store from "@/store";

Vue.use(VueRouter);

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next();
//     return;
//   }
//   next("/");
// };

const ifAuthenticated = (to, from, next) => {
  if (Store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    name: "index",
    components: {
      default: Starter,
      header: MainNavbar
    },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: "/login",
    name: "login",
    components: { default: Login, header: MainNavbar }
  },
  {
    path: "/register",
    name: "register",
    components: { default: SignupForm, header: MainNavbar }
  },
  {
    path: "/tasks",
    name: "tasks",
    components: {
      default: Tasks,
      header: MainNavbar
    },
    beforeEnter: ifAuthenticated
  },
  {
    path: "/bugs",
    name: "bugs",
    components: {
      default: Bugs,
      header: MainNavbar
    },
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  routes
});

export default router;
