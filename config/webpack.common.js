/**
 * Common properties shared between different environment types
 *
 * @author adam.caldwell
 */

const webpack = require('webpack');
const helpers = require('./helpers');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const ENV = JSON.stringify(process.env.NODE_ENV);

module.exports = function (options) {
    return {
        entry: {
            'app': helpers.root('src', 'app', 'app.module.js'),
            'vendor': helpers.root('src', 'app', 'vendor.js'),
        },
        devtool: 'source-map',
        output: {
            path: helpers.root('dist'),
            filename: ENV === 'production' ? '[name].[hash].js' : '[name].bundle.js',
            sourceMapFilename: '[name].map'
        },
        resolve: {
            extensions: ['.js', '.json'],
            modules: [helpers.root('src'), 'node_modules']
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
            }),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': ENV
            }),

            new HtmlWebpackPlugin({
                template: 'src/index.html',
                title: 'AngularJS Starter',
                chunksSortMode: 'none'
            }),

            new CleanWebpackPlugin(['dist']),
        ],
        module: {
            rules: [
                // Required:
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
                                presets: ['es2015'],
                                // Allows use of ES6 Object Spread Operator
                                plugins: ['transform-object-rest-spread']
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                },
                {
                    test: /\.html$/,
                    use: [
                        {loader: 'ngtemplate-loader?relativeTo=' + helpers.root('src')},
                        {loader: 'raw-loader'}
                    ],
                    exclude: [helpers.root('src/index.html')]
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff|woff2?)$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'file-loader'
                }
            ]
        }
    }
};
