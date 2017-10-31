/**
 * Webpack Configuration
 * @author adam.caldwell
 */

console.log("Beginning " + process.env.NODE_ENV + " build");
switch (process.env.NODE_ENV) {
    case 'production':
        module.exports = require('./config/webpack.prod')();
        break;
    case 'development':
    default:
        module.exports = require('./config/webpack.dev')();
}