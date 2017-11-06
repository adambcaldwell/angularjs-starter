/**
 * Vendor file for external dependencies
 * @author adam.caldwell
 */

/**
 * In order to use the full version of jQuery (required for bootstrap & potentially other external dependencies)
 *  the 3 imports below must be used. Importing these via the webpack.ProvidePlugin has not been successful in my
 *  experience.
 */
import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';
import 'expose-loader?window.jQuery!jquery';

import 'bootstrap';
