/**
 * Development specific configurations
 * @author adam.caldwell
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (options) => {
    return webpackMerge(commonConfig({
            entry: {
                'dev': helpers.root('src', 'app', 'dev.js')
            },
            devtool: 'inline-source-map',
            devServer: {
                contentBase: './dist'
            }
        }
    ))
};
