module.exports = {
  baseAlias: process.env.NODE_ENV==='production' ? '/m' : '', 
  cookie_prefix: 'zdt',                   // cookie 前缀
  apiDomain: '/api',                      //请求前缀
  token_sign: 'token',                    // token 标识 
  title: '',
  appid: '',
  qqAK: '',
  theme: {
    color: '#1890ff',
    mode: 'dark'
  },
  devServer: {
    publicPath: '/',
    port: 8899,
    hot: true,
    open: false,
    proxy: {
      '/api': {
        target:  'http://192.168.1.92/api',
        // target:  'http://192.168.1.92/api',
        changeOrigin: true,
        cookieDomainRewrite: '127.0.0.1',        
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
