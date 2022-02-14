<template>
  <section>
    <section class="p-5 container">
      <div class="mb-0">
        <strong>Donate to</strong>
        <br />
        <span v-html="this.title"></span>
      </div>
      <hr class="mt-2 mb-3" />
      <p class="mt-0 mb-3">
        <small v-html="this.desc"></small>
        <br />
        <b-button type="is-primary" class="mt-3" label="Make Donation" v-on:click="startDonation" />
      </p>
    </section>
    <section>
      <small style="padding-left: 30px; padding-right: 30px; text-align: center; position: absolute; width: 100%">
        All donations are proccessed through a third party, namely
        <a href="https://squareup.com/">Square Inc</a>.
      </small>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import config from "../config.json";
import { getAnalytics, logEvent } from "firebase/analytics";

export default Vue.extend({
  name: "Donate",
  data() {
    return {
      title: "",
      desc: "",
      analytics: getAnalytics(),
    };
  },
  methods: {
    startDonation() {
      // Log the event to Google Analytics
      logEvent(this.analytics, "donate", {
        action: "start",
      });

      // Open the donation page in a new tab
      window.open(config.donate.url, "_blank");
    },
  },
  created() {
    this.title = config.donate.title;
    this.desc = config.donate.desc;
  },
});
</script>