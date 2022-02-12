import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'


import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: "AIzaSyD6TBDVAX6YN59EObbNWHPQf0v0hqDSInU",
  authDomain: "rotarysantatracker.firebaseapp.com",
  projectId: "rotarysantatracker",
  storageBucket: "rotarysantatracker.appspot.com",
  messagingSenderId: "112955010383",
  appId: "1:112955010383:web:32eee136a908dd20f4293a"
};
initializeApp(firebaseConfig);

// Initalize Buefy
import './assets/style.scss'
Vue.use(Buefy)

// Initalize the Vue with Google Maps
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueGoogleMaps = require('vue2-google-maps')
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDBi2Jt0jMQiZiH3uhmTysTgxFMrmtKsEo',
    libraries: 'places',
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
