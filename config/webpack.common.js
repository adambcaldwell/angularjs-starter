/**
 * Common properties shared between different environment types
 *
 * @author adam.caldwell
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ENV = JSON.stringify(process.env.NODE_ENV);

module.exports = {
    entry: {
        'app': helpers.root('src', 'app', 'app.module.js'),
        'vendor': helpers.root('src', 'app', 'vendor.js')
    },
    devtool: 'source-map',
    output: {
        path: helpers.root('dist'),
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [helpers.root('src'), 'node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': ENV
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title: 'AngularJS Starter/Bootstrap4'
        })

        // Uncomment this if you want to run the bundle analyzer to examine how webpack is bundling files.
        // ,new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            // Inject AngularJS dependencies (via /*@ngInject*/ annotations)
            // Transpile js code from es6 to es5 (for browser compatibility).
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {loader: 'ng-annotate-loader'},
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            // Allows use of ES6 Object Spread Operator
                            plugins: ['transform-object-rest-spread']
                        }
                    }
                ]
            }, {
                test: /\.html$/,
                use: [
                    {loader: 'ngtemplate-loader?relativeTo=' + helpers.root('src')},
                    {loader: 'raw-loader'}
                ],
                exclude: [helpers.root('src/index.html')]
            }, {
                test: /\.(jpg|png|gif|ttf|otf|eot|svg|woff|woff2?)$/,
                loader: 'file-loader'
                // }, {
                //     test: /\.css$/,
                //     use: ExtractTextPlugin.extract({
                //         fallback: 'style-loader',
                //         use: 'css-loader'
                //     })
            }, {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',     // inject CSS to page
                }, {
                    loader: 'css-loader',       // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader',   // Run post css actions
                    options: {
                        plugins: function () {  // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader'       // compiles Sass to CSS
                }]
            },

        ]
    }
};