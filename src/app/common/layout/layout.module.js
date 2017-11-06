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
    .config(/*@ngInject*/ ($stateProvider, $urlRouterProvider) => {

        $stateProvider
            .state({
                parent: 'app',
                name: 'layout',
                url: '/layout',
                component: 'layoutComponent'
            });

        // Default behavior
        $urlRouterProvider.otherwise('/layout');
    })
    .component('layoutComponent', LayoutComponent)
    .name;

export default LayoutModule;
