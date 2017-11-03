/**
 * Development specific configurations
 * @author adam.caldwell
 */

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (options) => {
    return webpackMerge(commonConfig({
            devtool: 'inline-source-map',
            devServer: {
                contentBase: './dist'
            }
        }
    ))
};
