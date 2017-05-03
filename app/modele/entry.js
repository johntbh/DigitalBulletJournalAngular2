// Constante en provenance de la base de données
"use strict";
var BULLET_TASK_STANDARD = 1;
var SIGNIFIER_NO_SIGNIFIER = 5;
var Entry = (function () {
    function Entry() {
        this.id = 0;
        this.text = "";
        this.bullet = BULLET_TASK_STANDARD;
        this.signifier = SIGNIFIER_NO_SIGNIFIER;
        this.date = new Date();
    }
    return Entry;
}());
exports.Entry = Entry;
//# sourceMappingURL=entry.js.map