<template>
  <div>
    <div class="page-header clear-filter" filter-color="green">
      <parallax
        class="page-header-image"
        style="background-image:url('img/chicago1024.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/default_logo.webp" alt="" />
          <h1 class="h1-seo">QA ASSESSMENT</h1>
          <h3>AvenueCode QA Assessment.</h3>
        </div>
        <h6 class="category category-absolute">
          Designed and Coded by QA's
          <i class="now-ui-icons emoticons_satisfied"></i>
        </h6>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from "@/components";

export default {
  name: "landing",
  bodyClass: "index-page",
  components: {
    Parallax
  }
};
</script>
<style></style>
