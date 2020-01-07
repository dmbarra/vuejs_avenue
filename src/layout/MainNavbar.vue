<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="100"
    menu-classes="ml-auto"
  >
    <template slot-scope="{}">
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        QA Assessment
      </router-link>
    </template>
    <template slot="navbar-menu">
      <div v-if="isAuthenticated">
        <li class="nav-item active">
          <a href="#/tasks" class="nav-link">
            <i class="now-ui-icons design_app"></i>
            <p>Tasks</p>
          </a>
        </li>
      </div>
      <drop-down
        v-if="isAuthenticated"
        tag="li"
        title="Candidate"
        icon="now-ui-icons business_globe"
        class="nav-item"
      >
        <nav-link to="/instructions">
          <i class="now-ui-icons business_chart-pie-36"></i> Instructions
        </nav-link>
        <nav-link to="/userStories">
          <i class="now-ui-icons design_palette"></i> User Stories
        </nav-link>
        <nav-link to="/bugs">
          <i class="now-ui-icons education_glasses"></i> Bugs
        </nav-link>
        <nav-link>
          <div @click="logout">
            <i class="now-ui-icons ui-1_simple-remove"></i>
            Logout
          </div>
        </nav-link>
      </drop-down>
      <drop-down
        v-if="!isAuthenticated"
        tag="li"
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
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "@/client/actions/auth";

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
  },
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.auth.status === "loading",
      name: state => `${state.user.profile.title} ${state.user.profile.name}`
    })
  }
};
</script>

<style scoped></style>
