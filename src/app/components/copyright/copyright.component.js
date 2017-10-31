import template from "./copyright.html";

/**
 * Copyright Component
 *  Note: the year automatically updates
 * @author adam.caldwell
 */

const CopyrightComponent = {
    templateUrl: template,
    controller: class Copyright {
        constructor() {
            this.year = new Date().getFullYear();
        }
    }
};

export default CopyrightComponent;