import angular from 'angular';

/**
 * Shared Module for Components, Configurations, & Services
 *  This module is for pieces of code that are used in both the Common and Components directories
 *      modifying code from here can cause widespread issues if not handled carefully.
 * @author adam.caldwell
 */

const SharedModule = angular
    .module('shared.module', [])
    .name;

export default SharedModule;