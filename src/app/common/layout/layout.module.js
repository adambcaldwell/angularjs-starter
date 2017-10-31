import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import LayoutComponent from "./layout.component";

/**
 * Layout Module
 * @author adam.caldwell
 */

const LayoutModule = angular
    .module('layout.module', [
        uiRouter
    ])
    .config(/*@ngInject*/ ($stateProvider) => {

        $stateProvider
            .state({
                name: 'layout',
                url: 'layout',
                component: 'layoutComponent'
            });

    })
    .component('layoutComponent', LayoutComponent)
    .name;

export default LayoutModule;
