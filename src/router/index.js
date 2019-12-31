import Vue from "vue";
import VueRouter from "vue-router";
import Starter from "@/pages/HomePage.vue";
import LandingNavbar from "@/layout/LandingNavbar.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import Login from "@/pages/Login.vue";
import Tasks from "@/pages/Tasks.vue";
import Bugs from "@/pages/Bugs.vue";
import SignupForm from "@/pages/SignupForm.vue";
import BasicElementsSection from "@/pages/components/BasicElementsSection.vue";
import JavascriptComponents from "@/pages/components/JavascriptComponents.vue";

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
  },
  {
    path: "/register",
    name: "register",
    components: { default: SignupForm, header: MainNavbar },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: "/tasks",
    name: "tasks",
    components: {
      default: Tasks,
      header: LandingNavbar
    },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: "/bugs",
    name: "bugs",
    components: {
      default: Bugs,
      header: LandingNavbar
    },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: "/temp",
    name: "temp",
    components: {
      default: BasicElementsSection,
      header: LandingNavbar
    },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: "/temp2",
    name: "temp2",
    components: {
      default: JavascriptComponents,
      header: LandingNavbar
    },
    props: {
      header: { colorOnScroll: 400 }
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
