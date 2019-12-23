import Vue from "vue";
import VueRouter from "vue-router";
import Starter from "@/pages/StarterPage.vue";
import StarterNavbar from "@/layout/StarterNavbar.vue";
import StarterFooter from "@/layout/StarterFooter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    components: {
      default: Starter,
      header: StarterNavbar,
      footer: StarterFooter
    },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: "black" }
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
