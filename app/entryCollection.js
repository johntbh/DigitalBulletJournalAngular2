// Constante en provenance de la base de données
"use strict";
var BULLET_TASK_STANDARD = 1;
var SIGNIFIER_NO_SIGNIFIER = 5;
var EntryCollection = (function () {
    function EntryCollection() {
        this.id = 0;
        this.text = "";
        this.bullet = BULLET_TASK_STANDARD;
        this.signifier = SIGNIFIER_NO_SIGNIFIER;
        this.idCollection = 0;
    }
    return EntryCollection;
}());
exports.EntryCollection = EntryCollection;
//# sourceMappingURL=entryCollection.js.map