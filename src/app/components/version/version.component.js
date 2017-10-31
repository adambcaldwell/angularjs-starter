/**
 * App Version Component
 *  Note: There needs to be a constant named 'app_version' defined in the application for this to work.
 * @author adam.caldwell
 */

const VersionComponent = {
    template: '<span>{{ $ctrl.version }}</span>',
    controller: class AppVersion {
        /*@ngInject*/
        constructor(app_version) {
            this.version = app_version;
        }
    }
};

export default VersionComponent;