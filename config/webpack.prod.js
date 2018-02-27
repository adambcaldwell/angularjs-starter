/**
 * Production specific configurations
 *
 * @author adam.caldwell
 */

const ArchivePlugin = require('webpack-archive-plugin');
const commonConfig = require("./webpack.common.js");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require("webpack-merge");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (options) {
    return webpackMerge(
        commonConfig,
        {
            mode: 'production',
            output: {
                filename: '[name].[hash].js',
            },
            plugins: [
                new UglifyJsPlugin({
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions: {
                        ecma: 5,
                        output: {
                            comments: false,
                            beautify: false
                        }
                    }
                }),

                // TODO: Look into using this to exclude some dev-chunks?
                // new HtmlWebpackPlugin({
                //     excludeChunks: ['dev-helper']
                // }),

                new ExtractTextPlugin({
                    filename: 'style.[hash].css',
                    allChunks: true
                }),

                // Create a deployable *.tar.gz file
                new ArchivePlugin({
                    output: 'angularjs-starter',
                    format: 'tar'
                })

            ]
        }
    );
};
