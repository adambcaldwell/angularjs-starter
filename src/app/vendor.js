/**
 * Vendor file for external dependencies
 *  Notes:
 *   - Using expose-loader here because I've never been successful in getting the webpack.ProvidePlugin to work
 *      correctly.
 *   -
 *
 * @author adam.caldwell
 */

import 'expose-loader?$!expose-loader?jQuery!expose-loader?window.jQuery!jquery';
import 'angular';

import '@uirouter/angularjs';
import '@uirouter/visualizer';
import 'expose-loader?Popper!popper.js';
import 'bootstrap';