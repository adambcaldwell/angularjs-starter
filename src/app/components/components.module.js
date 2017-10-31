import angular from 'angular';

import CopyrightComponent from "./copyright/copyright.component";
import VersionComponent from "./version/version.component";

/**
 * Module for all *reusable components*
 *  Note: modifying reusable component(s) will impact all references to them in this application.
 * @author adam.caldwell
 */

const ComponentsModule = angular
    .module('component.module', [])
    .component('copyright', CopyrightComponent)
    .component('version', VersionComponent)
    .name;

export default ComponentsModule;
