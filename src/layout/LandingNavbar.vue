<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template slot-scope="{}">
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        QA Assessment
      </router-link>
    </template>
    <template slot="navbar-menu">
      <drop-down
        tag="li"
        title="Profile"
        icon="now-ui-icons users_circle-08"
        class="nav-item"
      >
        <nav-link to="/register">
          <i class="now-ui-icons ui-1_simple-add"></i> Register
        </nav-link>
        <nav-link to="/login">
          <i class="now-ui-icons users_single-02"></i> Login
        </nav-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";

export default {
  name: "landing-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    NavLink
  }
};
</script>

<style scoped></style>
