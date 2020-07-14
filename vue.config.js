// 引入gzip压缩插件
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const {getThemeColors, modifyVars} = require('./src/helpers/themeUtil')
const {resolveCss} = require('./src/helpers/theme-color-replacer-extend')
const { baseAlias, devServer } = require('./config')

module.exports = {
  publicPath: `${baseAlias}/`,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: devServer,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")],
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: config => {
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        resolveCss
      })
    )

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
    }
    
  },
  chainWebpack (config) {
    // 禁用prefetch和preload，在router.jszhong1通过webpack的内联注释手动选定要提前获取的代码区块
    // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 开启热更新
    //config.resolve.symlinks(true)
    
    config.externals = {
      'echarts': 'echarts',
      'ant-design-vue': 'ant-design-vue'
    }
    
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-source-map')
    )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config.plugin('optimize-css')
        .tap(args => {
            args[0].cssnanoOptions.preset[1].colormin = false
          return args
        })
        
      config
        .plugin("compressionPlugin")
        .use(CompressionPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 102400, //超过10k进行压缩
            deleteOriginalAssets: false //是否删除源文件
          }
        ]);
      
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          //公用模块抽离
          common: {
            chunks: 'initial',
            minSize: 0, //大于0个字节
            minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
          },
          //第三方库抽离
          vendor: {
            priority: 1, //权重
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0, //大于0个字节
            minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
