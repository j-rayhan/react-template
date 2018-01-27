//const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
//const MinifyPlugin = require("babel-minify-webpack-plugin");
//const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

console.log("Current ENV is: " + process.env.NODE_ENV);

//const PUBLIC_PATH = "/assets/dist/";

// TODO cache google fonts with service worker
// if change filename: remember to change reference to this file in _Root.cshtml
//const serviceWorkerFileName = "service-worker.js";

// const cleanOptions = {
//     root: path.resolve("../"),
//     verbose: true,
//     dry: false,
//     watch: true,
// }

// const pathsToClean = [
//     'assets/dist',
//     serviceWorkerFileName,
// ];

module.exports = [{
    entry: [
      'script!jquery/dist/jquery.min.js',
      'script!foundation-sites/dist/foundation.min.js',
      './app/app.jsx'
    ],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery'
      })
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src")
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, "src"),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader/useable',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                autoprefixer: false,
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }
                    ]
                })
            },
            {
                test: /\.woff(2)?(\?[a-z0-9]+)?$/,
                include: path.resolve(__dirname, "src"),
                loader: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
                include: path.resolve(__dirname, "src"),
                loader: "file-loader"
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new ExtractTextPlugin('styles.[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new MinifyPlugin(),
        new SWPrecacheWebpackPlugin(
            {
                cacheId: 'skuld-cache',
                runtimeCaching: [
                    { handler: 'fastest', urlPattern: /^https:\/\/fonts\.googleapis\.com/ },
                    { handler: 'fastest', urlPattern: /^https:\/\/fonts\.gstatic\.com/}
                ],
                minify: false,
                navigateFallback: '/index.html',
                staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            }
        )
    ]
}, {
    entry: "./src/editor.css",
    output: {
        path: path.resolve('dist/editor'),
        filename: 'editor.css'
    },
    module: {
        loaders: [
            {
                test: /\.css/,
                include: path.resolve(__dirname, "src"),
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('editor.css')
    ]
}]
