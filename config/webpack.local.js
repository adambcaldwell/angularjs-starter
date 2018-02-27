/**
 * Local specific configurations
 *  For use with webpack dev server
 * @author adam.caldwell
 */

const commonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require('webpack-merge');

module.exports = (options) => {
    return webpackMerge(
        commonConfig,
        {
            mode: 'development',
            output: {
                filename: '[name].bundle.js',
            },
            devtool: 'inline-source-map',
            devServer: {
                contentBase: './dist'
            },
            plugins: [
                new ExtractTextPlugin({
                    filename: 'style.css',
                    allChunks: true
                })
            ]
        }
    );
};
