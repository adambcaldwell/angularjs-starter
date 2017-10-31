/**
 * Production specific configurations
 *
 * @author adam.caldwell
 */

const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = (options) => {
    return webpackMerge(commonConfig({
            plugins: [
                new webpack.LoaderOptionsPlugin({
                    minimize: true,
                    debug: false
                }),
                new webpack.optimize.UglifyJsPlugin({
                    parallel: true,
                    comments: false,
                    sourceMap: true,
                    uglifyOptions: {
                        ie8: false,
                        output: {
                            comments: false,
                            beautify: false,
                            compress: true,
                            warnings: true
                        }
                    }
                })
            ]
        })
    )
};
