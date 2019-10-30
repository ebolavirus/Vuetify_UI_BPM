import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// Translation provided by Vuetify (javascript)
import zh from './locale/zh.js'
import en from './locale/en.js'
import hu from './locale/hu.js'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { zh, en, hu },
    current: 'zh',
  },
  theme: {
    themes: {
      light: {
        primary: '#3C78C8',
        secondary: '#5b9bd5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
    dark: false
  }
});