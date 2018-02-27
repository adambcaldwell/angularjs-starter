/**
 *  Environment based webpack config:
 *      Production
 *      Development
 *      Local (Default) - webpack dev server configuration
 *
 * @author adam.caldwell
 */

console.log("Beginning " + process.env.NODE_ENV + " build");
switch (process.env.NODE_ENV) {
    case 'production':
        module.exports = require('./config/webpack.prod')();
        break;
    case 'development':
        module.exports = require('./config/webpack.dev')();
        break;
    case 'local':
    default:
        module.exports = require('./config/webpack.local')();
}
