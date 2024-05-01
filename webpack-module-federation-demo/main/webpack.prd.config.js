const appPackeageJson = require('./jsconfig.json')
const path = require('path')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
// html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 通过分析项目中基于入口的引用和使用的依赖管理（分析import等引入方式）分析出依赖图，将一个或多个模块组合成一个或多个bundle
// 当分析的依赖树和代码没有变更时，生成的静态产物资源的hash值不会有新的变化，是否可利用这个属性规则，在控制台明确输出对应的资源

module.exports = {
    mode: 'production',
    entry: {
        index: '/src/main.js',
    },
    // 
    output: {
        filename: '[name].[hash].js', // 产物资源文件名
        path: path.resolve(__dirname, 'dist'), // 指定打包之后，所有产物存放的目录，这里指定放在dist目录下
        clean: true, // 每次都会先清理path中的文件，并只生成用到的文件

        // 指定静态资源生成的名字，static指定存放的目录，不指定则放在根目录下
        assetModuleFilename: 'static/[name].[hash].[ext]'
    },
    // config see - https://webpack.docschina.org/configuration/devtool
    devtool: 'none',
    // config resolve see - https://webpack.docschina.org/configuration/resolve/
    resolve: {
        // alias字段可与jsconfig.json的paths保持一致，这样开发环境下，能够拥有较好的代码提示
        alias: {
            "@": path.resolve(__dirname, 'src/'),
            "~assets": path.resolve(__dirname, 'src/assets/'),
        },
    },
    module: {
        rules: [
            // 使用css-loader和style-loader处理css样式
            // 更多支持less、scss、sass等语法和解析文件，需要安装对应的loader，并添加响应rules
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // 使用webpack内置的Assets Modules模块处理图像资源
            {
                // 处理png、jpg、jpeg、webg、svg
                test: /\.(png|jpg|jpeg|webp|svg)$/i,
                type: 'asset/resource',
            },
            // 使用webpack内置的Assets Modules模块处理字体资源
            {
                // 处理woff、woff2、eot、ttf、otf
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // 处理csv文件
            // see - https://github.com/theplatapi/csv-loader
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            // 处理xml文件
            // see - https://github.com/gisikw/xml-loader
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            // 通过使用对应的package将yaml、toml、json5文件作为json模块引入
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                    parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                    parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
        ]
    },
    plugins: [
        // config see - https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: appPackeageJson.name,
            template: 'index.html', // 指定根目录下的index.html为生成dist/index.html的基础模板
        }),
    ],
    optimization: {
        /*
            see - https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
            runtimeChunk选项的作用是将运行时代码提取到单独的文件中，以便缓存利用和减小构建输出的文件大小，默认值是 false：每个入口 chunk 中直接嵌入 runtime（包含webpack的模块加载器和模块解析器）
            'single': Webpack会将运行时代码（例如，模块加载器和模块解析器等）提取到一个单独的文件中，它包含了Webpack运行时所需的逻辑
                      使用单独的运行时文件的好处：缓存利用、更好的长期缓存
                      如果你在同一个页面中引用多个入口起点（例如entry配置了多个入口文件），请注意此行为。你或许应该将其设置为 single
        */
        runtimeChunk: 'single',

        /*
            SplitChunksPlugin
            自动拆分chunks的条件：see - https://webpack.docschina.org/plugins/split-chunks-plugin#defaults
            配置项：see - https://webpack.docschina.org/plugins/split-chunks-plugin#optimizationsplitchunks
        */
        splitChunks: {
            // chunks: 'all', // string | function(chunk) => {}
            minSize: 100, // 分chunks的最小字节，默认是20000（20kb），这里为了测试该特性和cacheGroups特性，故意写的100（0.1kb），目的是将common独立打包并分组到common-core中
            /*
                cacheGroups的组对象，继承splitChunks的所有属性
            */
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录下的模块
                    name: 'vendors', // 生成的独立 vendors 模块的名称
                    chunks: 'all', // 包括所有类型的代码块：initial、async 和 all
                },
                common: {
                    name: 'common-core', // 生成的 common 模块的名称
                    test: /[\\/]src[\\/]/, // 匹配 src 目录下的模块
                    minChunks: 2, // 至少被引用两次的模块才会被打包到该组
                    chunks: 'all', // 包括所有类型的代码块：initial、async 和 all
                    priority: 10, // 缓存组的优先级，数字越大，优先级越高
                },
            },
        }
    },
}