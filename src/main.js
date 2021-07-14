import Vue from 'vue'
import App from './App.vue'
// Import Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios) // Use in all components 
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBiBOhiKQgdk79zNbrT8-YJYhsi9Ws-m-U',
    },
})



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
