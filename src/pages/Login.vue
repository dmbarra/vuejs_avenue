<template>
  <div class="page-header clear-filter" filter-color="red">
    <div
      class="page-header-image"
      style="background-image: url('img/chicago1024.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <alert :visible="alert.danger" type="danger">
          {{ alertMesssage }}</alert
        >
        <div class="col-md-6 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/default_logo.webp'" alt="" />
            </div>

            <fg-input
              class="no-border form-control-lg"
              addon-left-icon="now-ui-icons users_single-02"
              placeholder="Username..."
              v-model="username"
            >
            </fg-input>

            <fg-input
              class="no-border form-control-lg"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="Password..."
              type="password"
              v-model="password"
            >
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <n-button
                  name="login"
                  @click.native="loginAndGenerateToken()"
                  type="primary"
                  round
                  wide
                >
                  Sign in...
                </n-button>
              </div>
              <div class="pull-left">
                <h6>
                  <a href="#register" class="link footer-link">Register</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput, Alert } from "@/components";
import MainFooter from "@/layout/MainFooter";
import Token from "@/client/token";
import { AUTH_REQUEST } from "@/client/actions/auth";

export default {
  name: "login-page",
  bodyClass: "login-page",
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    Alert
  },
  data: function() {
    return {
      alert: {
        danger: false
      },
      alertMesssage: "Something went wrong",
      username: "",
      password: ""
    };
  },
  methods: {
    loginAndGenerateToken: function() {
      const { username, password } = this;
      this.$store
        .dispatch(AUTH_REQUEST, { username, password })
        .then(() => {
          console.log("login " + this.$store.getters.tokenAuthenticated);
          this.$router.push("/");
        })
        .catch(
          err =>
            (this.alertMesssage = Token.extractMessageError(err.response.data)),
          (this.alert.danger = true)
        );
    }
  }
};
</script>
<style></style>
