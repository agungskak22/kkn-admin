import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.use(VueGoogleMaps, {
  load: {
    key:  "AIzaSyC4m3960a0NxbUHCNND05Us9fwb0MSJvoI",
    libraries: 'places,drawing,visualization' 
  },
})

Vue.prototype.$http = Axios
// Vue.prototype.$apiurl = 'https://api-gis.ercasystem.com/api'
Vue.prototype.$apiurl = 'http://127.0.0.1:8000/api';
// Vue.prototype.$apiLogin = 'https://api-gis.ercasystem.com/oauth'
Vue.prototype.$apiLogin = 'http://127.0.0.1:8000/oauth'
// Vue.prototype.$imageUrl = 'https://api-gis.ercasystem.com';
Vue.prototype.$imageUrl = 'http://127.0.0.1:8000';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')