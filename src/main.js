import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import './components/test.js'

import DialogPromise from './DialogPromise'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './css/vuetify_bpm.css'

function _getLocale() {
    let locale = "en";
    const locales = Object.keys(i18n);
    for (let i = 0; i < locales.length; i++) {
        if (window.location.pathname.indexOf('/' + locales[i] + '/') !== -1) {
            locale = locales[i];
            return locale;
        }
    }
    return locale;
}

Vue.use(DialogPromise, {
    snackbarParent: "app",
    locale: _getLocale()
});
Vue.config.productionTip = false;
new Vue({
    vuetify,
    render: h => h(App),
}).$mount('#app');