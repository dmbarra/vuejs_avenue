<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/chicago1024.jpg')"
    ></div>
    <div class="container">
      <alert :visible="alert.danger" type="danger"> {{ alertMesssage }}</alert>
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <div>
              <div slot="header" class="logo-container">
                <img v-lazy="'img/default_logo.webp'" alt="" />
              </div>
            </div>
          </template>
          <template>
            <fg-input
              class="no-border"
              placeholder="First Name..."
              addon-left-icon="now-ui-icons users_circle-08"
              v-model="name"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Username..."
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="username"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Email..."
              addon-left-icon="now-ui-icons ui-1_email-85"
              v-model="email"
            >
            </fg-input>
            <fg-input
              :class="getInputPasswordClass()"
              placeholder="Password..."
              addon-left-icon="now-ui-icons objects_key-25"
              type="password"
              v-model="first_password"
            >
            </fg-input>
            <fg-input
              :class="getInputPasswordClass()"
              placeholder="Confirm Password..."
              addon-left-icon="now-ui-icons objects_key-25"
              type="password"
              v-model="second_password"
            >
            </fg-input>
          </template>
          <div class="card-footer text-center">
            <n-button
              :disabled="
                first_password === '' || second_password !== first_password
              "
              type="neutral"
              round
              size="lg"
              @click.native="createAndLogin()"
              >Register</n-button
            >
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, FormGroupInput, Button, Alert } from "@/components";
import { AUTH_REQUEST } from "@/client/actions/auth";
import Users from "@/client/users";

export default {
  components: {
    Card,
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
      first_password: "",
      second_password: "",
      email: "",
      name: ""
    };
  },
  methods: {
    createAndLogin: function() {
      const { username, first_password, email, name } = this;
      Users.createUser({ username, first_password, email, name })
        .then(() => {
          this.loginAndGenerateToken(this.username, this.first_password);
        })
        .catch(err => {
          this.alertMesssage = Users.extractMessageError(
            err.response.data
          ).join(" And ");
          this.alert.danger = true;
        });
    },
    loginAndGenerateToken: function(username, password) {
      this.$store
        .dispatch(AUTH_REQUEST, { username, password })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.response.data);
          this.$router.push("/login");
        });
    },
    getInputPasswordClass: function() {
      return this.first_password == this.second_password &&
        this.first_password != ""
        ? "no-border has-success"
        : "no-border has-danger";
    }
  }
};
</script>
<style></style>
