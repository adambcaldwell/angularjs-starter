/**
 * Development specific configurations
 * @author adam.caldwell
 */

const ArchivePlugin = require('webpack-archive-plugin');
const commonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require('webpack-merge');

module.exports = (options) => {
    return webpackMerge(
        commonConfig,
        {
            mode: 'development',
            output: {
                filename: '[name].[hash].js',
            },
            devtool: 'inline-source-map',
            plugins: [

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
