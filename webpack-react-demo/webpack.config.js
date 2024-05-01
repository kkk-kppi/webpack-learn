const appPackeageJson = require('./jsconfig.json')
const path = require('path')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
// html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 通过分析项目中基于入口的引用和使用的依赖管理（分析import等引入方式）分析出依赖图，将一个或多个模块组合成一个或多个bundle
// 当分析的依赖树和代码没有变更时，生成的静态产物资源的hash值不会有新的变化，是否可利用这个属性规则，在控制台明确输出对应的资源

module.exports = {
    mode: 'development',
    // 指定分析依赖的入口文件，可以设置一个或多个
    // 产物的最终生成个数，会根据入口文件的个数生成
    entry: {
        /*
            默认情况下，每个入口 chunk 保存了全部其用的模块(modules)
            即，生成的index和bundle产物，其共同引用的模块（或者依赖库和包），都各自包含了
            实际上，这一部分是公用的，不应该重复生成，应该抽离出来或者提取为公用的包，这个可以减小代码体积
        */
        index: '/src/main.js',
    },
    // 
    output: {
        filename: '[name].[contenthash].js', // 产物资源文件名
        path: path.resolve(__dirname, 'dist'), // 指定打包之后，所有产物存放的目录，这里指定放在dist目录下
        clean: true, // 每次都会先清理path中的文件，并只生成用到的文件

        // 指定静态资源生成的名字，static指定存放的目录，不指定则放在根目录下
        assetModuleFilename: 'static/[name].[hash].[ext]',
    },
    devtool: 'inline-source-map',
    // v4.0.0之后，HOT（热模块替换）是默认开启的
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9080,
        hot: true,
    },
    resolve: {
        // alias字段可与jsconfig.json的paths保持一致，这样开发环境下，能够拥有较好的代码提示
        alias: {
            "@": path.resolve(__dirname, 'src/'),
            "~assets": path.resolve(__dirname, 'src/assets/'),
        },
    },
    module: {
        rules: [
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
            // 引入之后，会被按照特定的规则解析为json对象
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
            template: './index.html', // 指定根目录下的index.html为生成dist/index.html的基础模板
        }),
        // config see - https://github.com/webpack-contrib/copy-webpack-plugin
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    to: "public",
                },
            ],
        })
    ],
    optimization: {
        /*
            see - https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
            runtimeChunk选项的作用是将运行时代码提取到单独的文件中，以便缓存利用和减小构建输出的文件大小，默认值是 false：每个入口 chunk 中直接嵌入 runtime（包含webpack的模块加载器和模块解析器）
            'single': Webpack会将运行时代码（例如，模块加载器和模块解析器等）提取到一个单独的文件中，它包含了Webpack运行时所需的逻辑
                      使用单独的运行时文件的好处：缓存利用、更好的长期缓存
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
        },

        /* see - https://webpack.docschina.org/guides/caching/#module-identifiers */
        moduleIds: 'deterministic'
    },
}