<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <h1 class="title" v-html="this.title"></h1>
          <h2 class="subtitle" v-html="this.desc"></h2>
          <router-link to="/track" tag="div" class="buttons">
            <b-button type="is-primary" expanded>Track Santa</b-button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.hero.is-info {
  background: linear-gradient(rgba(0, 0, 0, 80%), rgba(0, 0, 0, 0.5)),
    url(../assets/background.jpeg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import config from "../config.json";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      title: "",
      desc: "",
    };
  },
  created() {
    this.title = config.home.title;
    this.desc = config.home.desc;
  },
});
</script>