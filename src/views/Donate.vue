<template>
  <section>
    <section class="p-5 container">
      <div class="mb-0">
        <strong>Donate to</strong>
        <br />Coalville Belvoir Rotary Club
      </div>
      <hr class="mt-2 mb-3" />
      <p class="mt-0 mb-3">
        <small>With your support we can continue to provide to the local community, we are grateful for your support.</small>
        <br />
        <b-button type="is-primary" class="mt-3" label="Make Donation" v-on:click="startDonation" />
      </p>
    </section>
    <section>
      <small style="padding-left: 30px; padding-right: 30px; text-align: center; position: absolute;">
        All donations are proccessed through a third party, namely
        <a href="https://squareup.com/">Square Inc</a>.
      </small>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Donate",
  methods: {
    startDonation() {
      window.location.href = "https://square.link/u/5RlRakc3";
    },
  },
});
</script>