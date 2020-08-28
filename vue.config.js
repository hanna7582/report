module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.i-screamreport.com/ops/parent',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/styles/styles.scss";`
      }
    }
  },
}