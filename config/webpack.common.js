/**
 * Common properties shared between different environment types
 *
 * @author adam.caldwell
 */

const webpack = require('webpack');
const helpers = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const ENV = JSON.stringify(process.env.NODE_ENV);

module.exports = function (options) {
    return {
        entry: {
            'app': helpers.root('src', 'app', 'app.module.js'),
            'vendor': helpers.root('src', 'app', 'vendor.js'),
        },
        devtool: 'source-map',
        output: {
            path: helpers.root('build'),
            filename: '[name].bundle.js',
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
                angular: 'angular',
                Popper: ['popper.js', 'default']
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': ENV
                }
            }),

            // Copy CSS/Font/etc.. Dependencies into the proper dist folders.
            new CopyWebpackPlugin([
                    {from: 'src/media', to: 'media'},
                    // Fonts
                    {from: 'node_modules/font-awesome/fonts/FontAwesome.otf', to: 'media/fonts'},
                    {from: 'node_modules/font-awesome/fonts/fontawesome-webfont.eot', to: 'media/fonts'},
                    {from: 'node_modules/font-awesome/fonts/fontawesome-webfont.woff', to: 'media/fonts'},
                    {from: 'node_modules/font-awesome/fonts/fontawesome-webfont.woff2', to: 'media/fonts'},
                    {from: 'node_modules/font-awesome/fonts/fontawesome-webfont.ttf', to: 'media/fonts'},
                    // CSS
                    {from: 'node_modules/font-awesome/css/font-awesome.css', to: 'media/css'},
                    {from: 'node_modules/bootstrap/dist/css/bootstrap.css', to: 'media/css'}
                ],
                {
                    ignore: [
                        '*.less',
                        'src/media/css/less/**/*'
                    ]
                }),

            new HtmlWebpackPlugin({
                hash: true,
                title: 'Bootstrap4',
                // favicon: 'src/media/images/favicon.ico',
                devServer: 'http://localhost:8080',
                chunksSortMode: 'none',
                template: 'src/index.html'

            }),

            // Include assets (usually those copied by CopyWebpackPlugin)
            new HtmlWebpackIncludeAssetsPlugin({
                assets: [
                    'media/css/font-awesome.css',
                    'media/css/bootstrap.css',
                    'media/css/style.css'
                ],
                append: true,
                hash: true
            })
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
