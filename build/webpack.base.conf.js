'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    //入口
    entry: {
        app: './src/main.js'
    },
    //出口
    output: {
        path: config.build.assetsRoot, //index.js中的build配置中的assetsRoot，也就是dist目录
        filename: '[name].js',
        //上线地址，也就是真正的文件引用路径，如果是production生产环境，其实这里都是 '/'
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    /**
     * resolve是webpack的内置选项，顾名思义，决定要做的事情，
     * 也就是说当使用 import "jquery"，该如何去执行这件事情，就是resolve配置项要做的，
     * import jQuery from "./additional/dist/js/jquery" 这样会很麻烦，可以起个别名简化操作
     */
    resolve: {
        //省略扩展名，比方说import index form '../js/index', 会默认去找index文件，然后找index.js,.vue,.josn
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'), //意思是用@代替src的绝对路径
            config: process.env.NODE_ENV === 'production' ?
                resolve('src/config/system') : resolve('src/config/system/k-config.yml'),
            custom: resolve('src/config/custom/custom.xml'),
        }
    },
    // 不同的模块使用不同的loader
    module: {
        rules: [
            // ...(config.dev.useEslint ? [createLintingRule()] : []),

            // 对vue文件，使用vue-loader解析
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            // babel-loader把es6解析成es5
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            // 图形文件使用url-loader解析
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            // 音频文件使用url-loader解析
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            // 字体使用url-loader解析
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            //xml使用kxml-loader加载器解析
            {
                test: /\.xml$/,
                loader: require.resolve('../src/utils/xml-loader.js'),
                query: {
                    explicitArray: false, //默认点会转换为一个数组,设置explicitArray可以转换为数字或字符串
                    ignoreAttrs: true,
                    xmlRoot: 'root', //xml文件的根节点,移除掉xml根节点
                    conclusionType: true, //推断数据类型(Boolean和Number),并转换为对应类型值
                },
            },
            //自定义yml loader加载器
            {
                test: /\.yml$/,
                loader: require.resolve('../src/utils/yaml-loader.js'),
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}