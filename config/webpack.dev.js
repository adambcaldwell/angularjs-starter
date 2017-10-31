/**
 * Development specific configurations
 * @author adam.caldwell
 */

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (options) => {
    return webpackMerge(commonConfig({
            devtool: 'cheap-module-source-map',
            devServer: {
                // Note: these are being ignored - I believe this should use a node-api build style (see below)
                // https://github.com/webpack/webpack-dev-server/blob/master/examples/node-api-simple/server.js
                publicPath: 'build',
                historyApiFallback: true,
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                }
            }
        }
    ))
};
