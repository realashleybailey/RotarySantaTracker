<template>
  <div id="app">
    <div id="nav">
      <Navigation></Navigation>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
// .navbar-menu {
//   position: absolute;
//   width: 100%;
// }
</style>

<script lang="ts">
import Vue from "vue";
import { getAnalytics, logEvent } from "firebase/analytics";

export default Vue.extend({
  name: "App",
  components: {
    Navigation: () => import("./components/Navigation.vue"),
  },
  data() {
    return {
      analytics: getAnalytics(),
    };
  },
  methods: {
    cookieConsent() {
      // Check if the cookie consent has been accepted in localStorage
      if (localStorage.getItem("cookieConsent") === "true") {
        return;
      }

      // Create the cookie consent banner using Buefy
      this.$buefy.snackbar.open({
        message:
          "This website uses cookies to ensure you get the best experience on our website.",
        actionText: "Got it!",
        indefinite: true,
        queue: false,
        position: "is-bottom",
        onAction: () => {
          localStorage.setItem("cookieConsent", "true");

          // Log the event to Google Analytics
          logEvent(this.analytics, "cookie_consent", {
            action: "accepted",
          });
        },
      });
    },
    donateScreen() {
      // Check local storage to see if the user has already seen the dialog today
      const seenDialog = localStorage.getItem("seenDialog");

      // Check seenDialog date against today's date
      if (seenDialog !== new Date().toDateString()) {
        // If the user has not seen the dialog today, show it
        this.$buefy.dialog.confirm({
          title: "Would you consider donating?",
          message:
            "We are a non-profit organisation and we rely on donations and members to keep us running and help the community. Would you consider donating to our charity?",
          confirmText: "Yes",
          cancelText: "No",
          type: "is-danger",
          hasIcon: true,
          iconPack: "fa",
          icon: "heart",
          onConfirm: () => {
            // If they say yes, redirect to donate page
            this.$router.push("/donate");

            // Log the event to Google Analytics
            logEvent(this.analytics, "donate_screen", {
              action: "accepted",
            });
          },
          onCancel: () => {
            // Log the event to Google Analytics
            logEvent(this.analytics, "donate_screen", {
              action: "declined",
            });
          },
        });

        // Set the dialog as seen in local storage
        localStorage.setItem("seenDialog", new Date().toDateString());
      }
    },
  },
  mounted() {
    this.cookieConsent();
    this.donateScreen();
  },
});
</script>