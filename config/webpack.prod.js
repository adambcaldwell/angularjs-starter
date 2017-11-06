/**
 * Production specific configurations
 *
 * @author adam.caldwell
 */

const commonConfig = require("./webpack.common.js");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

module.exports = (options) => {
    return webpackMerge(commonConfig({
            plugins: [
                new UglifyJSPlugin({
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions: {
                        ecma: 5,
                        output: {
                            comments: false,
                            beautify: false
                        }
                    }
                })
            ]
        })
    )
};
