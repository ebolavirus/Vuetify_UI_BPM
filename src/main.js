import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import DialogPromise from './DialogPromise'
import './components/test.js'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './css/vuetify.origin.css'

Vue.config.productionTip = false
Vue.use(DialogPromise, {
  snackbarParent: "app"
});
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
