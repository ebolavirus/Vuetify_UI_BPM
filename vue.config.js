module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  // 修改 src 为 examples
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    ...(process.env.NODE_ENV === 'production' ?
      {
        externals: {
          'vuetify/lib': 'vuetify/lib',
          'date-fns': 'date-fns'
        }
      } :
      {})
  }
}