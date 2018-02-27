// Import custom CSS/Scss before bootstrap (per bootstrap docs)

import './../../node_modules/bootstrap/scss/bootstrap.scss';

/**
 * Primary App Component
 * @author adam.caldwell
 */

const AppComponent = {
    template: '<ui-view></ui-view>',
    controller: class App {
        /*@ngInject*/
        constructor() {
        }
    }
};

export default AppComponent;
