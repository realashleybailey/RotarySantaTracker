<template>
  <b-navbar :active.sync="isActive">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/logo.png" alt="Rotary Club Logo" />
      </b-navbar-item>
    </template>
    <template #start>
      <router-link to="/home" class="navbar-item" active>Home</router-link>
      <router-link to="/about" class="navbar-item">About</router-link>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <router-link to="/donate" class="button is-primary">
          <strong>Donate</strong>
        </router-link>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style>
.navbar-menu {
  overflow: hidden;
  animation: navAnimHide 0.2s ease-in-out;
}

.navbar-menu.is-active {
  animation: navAnim 0.2s ease-in-out;
}

@keyframes navAnim {
  0% {
    display: none;
    max-height: 0px;
  }
  100% {
    max-height: 1000px;
  }
}

@keyframes navAnimHide {
  0% {
    max-height: 1000px;
  }
  100% {
    display: none;
    max-height: 0px;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
  data() {
    return {
      isActive: false,
    };
  },
  watch: {
    $route(to, from) {
      this.isActive = false;
      console.log(to, from);
    },
  },
});
</script>