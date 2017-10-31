import angular from 'angular';

import LayoutModule from "./layout/layout.module";

/**
 * Module for all application specific components
 * @author adam.caldwell
 */

const CommonModule = angular
    .module('common.module', [
        LayoutModule
    ])
    .name;

export default CommonModule;
