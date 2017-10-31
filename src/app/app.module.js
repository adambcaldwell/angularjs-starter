import angular from "angular";
import uiRouter from "@uirouter/angularjs";
import {Visualizer} from "@uirouter/visualizer";

import AppComponent from "./app.component";
import CommonModule from "./common/common.module";
import ComponentsModule from "./components/components.module";
import SharedModule from "./shared/shared.module";
import {appVersion} from './app.constants';

/*
 * This is the base of the Application.
 * @author adam.caldwell
 */

const AppModule = angular
    .module('app.bootstrap', [
        CommonModule,
        ComponentsModule,
        SharedModule,
        uiRouter
    ])
    .config(/*@ngInject*/ ($stateProvider, $urlRouterProvider) => {

        $stateProvider
            .state({
                name: 'app',
                abstract: true,
                url: '',
                component: 'appComponent'
            });

        // Default behavior
        $urlRouterProvider.otherwise('/layout');

    })
    .config(/*@ngInject*/ ($compileProvider) => {
        // Directives should be restricted to the element name.
        $compileProvider.commentDirectivesEnabled(false);
        $compileProvider.cssClassDirectivesEnabled(false);
        // Compiler will enforce all bindings of a component that are not set as optional ('?')
        $compileProvider.strictComponentBindingsEnabled(true);
    })
    .component('appComponent', AppComponent);

// Different configurations based on build environment
if (process.env.NODE_ENV === 'production') {
    AppModule.config(/*@ngInject*/ ($compileProvider) => {
        // Speed improvements for production build
        $compileProvider.debugInfoEnabled(false);
    })
} else {
    /* - - - Development build - - - */
    // Enable UI Router Visualizer
    AppModule.run(/*@ngInject*/ ($uiRouter) => {
        $uiRouter.plugin(Visualizer);
    });

    // Enable trace logging (UI-Router) - options are: HOOK, RESOLVE, TRANSITION, UIVIEW, VIEWCONFIG
    AppModule.run(/*@ngInject*/ ($trace) => $trace.enable("TRANSITION"))
}

// - - - Constants - - -
AppModule.constant('app_version', appVersion);

export default AppModule;
