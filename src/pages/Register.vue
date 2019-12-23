<template>
  <div class="page-header clear-filter" filter-color="blue">
    <div
      class="page-header-image"
      style="background-image: url('img/chicago1024.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-6 ml-auto mr-auto">
          <card type="register" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/default_logo.webp'" alt="" />
            </div>

            <fg-input
              class="no-border form-control-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Username..."
            >
            </fg-input>

            <fg-input
              class="no-border form-control-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Name..."
            >
            </fg-input>

            <fg-input
              class="no-border form-control-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Email..."
            >
            </fg-input>

            <fg-input
              class="no-border form-control-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Password..."
            >
            </fg-input>

            <fg-input
              class="no-border form-control-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Confirm Password..."
            >
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a
                  href="#pablo"
                  class="btn btn-primary btn-round btn-lg btn-block"
                  >Register...</a
                >
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
import { Card, Button, FormGroupInput } from "@/components";
import MainFooter from "@/layout/MainFooter";
export default {
  name: "register-page",
  bodyClass: "register-page",
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  }
};
</script>
<style></style>
