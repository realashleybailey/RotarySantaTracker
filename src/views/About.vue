<template>
  <section>
    <section class="p-5 container">
      <div class="mb-0" v-html="this.title"></div>
      <hr class="mt-2 mb-3" />
      <p class="mt-0 mb-3">
        <small v-html="this.desc"></small>
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import config from "../config.json";

export default Vue.extend({
  name: "About",
  data() {
    return {
      title: "",
      desc: "",
    };
  },
  created() {
    this.title = config.about.title;
    this.desc = config.about.desc;
  },
});
</script>