module.exports = {
    // 修改 src 为 examples
    pages: {
      index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html'
      }
    },
    configureWebpack: {
      ...(process.env.NODE_ENV === 'production'
        ? {
            externals: {
              'vuetify/lib': 'vuetify/lib',
              'date-fns': 'date-fns'
            }
          }
        : {})
    },
    css: {
      loaderOptions: {
        sass: {
          data: `@import "~@/sass/main.scss"`,
        },
      },
    },
    // 扩展 webpack 配置，使 packages 加入编译
    // chainWebpack: config => {
    //   config.module
    //     .rule('js')
    //     .include
    //       .add('/src/components/index.js')
    //       .end()
    //     .use('babel')
    //       .loader('babel-loader')
    //       .tap(options => {
    //         // 修改它的选项...
    //         return options
    //       })
    // }
  }