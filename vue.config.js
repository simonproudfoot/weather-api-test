//in vue.config.js file
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  devServer: {
    proxy: 'http://datapoint.metoffice.gov.uk'
  }

  
}