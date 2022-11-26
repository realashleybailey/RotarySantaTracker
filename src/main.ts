/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 * License: Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created on Sun Feb 13 2022
 * Copyright (c) 2022 
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'

// Initizalize Firebase
import config from './config.json'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

initializeApp(config.firebase);
getAnalytics();

// Initalize Buefys
import './assets/style.scss'
Vue.use(Buefy)



// Initalize the Vue with Google Maps
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const VueGoogleMaps = require('vue2-google-maps')
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyDBi2Jt0jMQiZiH3uhmTysTgxFMrmtKsEo',
//     libraries: 'places',
//   },
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
