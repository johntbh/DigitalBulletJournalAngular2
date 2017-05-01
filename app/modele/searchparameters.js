"use strict";
var SearchParameters = (function () {
    function SearchParameters() {
        this.rowsPossible = [5, 10, 15, 25, 50, 100];
        this.text = "";
        this.bullets = [];
        this.signifiers = [];
        this.types = [];
        this.dateStart = null;
        this.dateEnd = null;
        this.page = 1;
        this.maxRows = 1;
        this.rowsOnPage = this.rowsPossible[0];
    }
    SearchParameters.prototype.isEmpty = function () {
        return (this.text.trim() === "" && this.bullets.length === 0 && this.signifiers.length === 0 && this.types.length === 0 && this.dateStart === null && this.dateEnd === null);
    };
    SearchParameters.prototype.getPage = function () {
        this.refreshPage();
        return this.page;
    };
    SearchParameters.prototype.getMaxPage = function () {
        return Math.ceil(this.maxRows / this.rowsOnPage.valueOf());
    };
    SearchParameters.prototype.refreshPage = function () {
        var maxPage = this.getMaxPage();
        if (this.page > maxPage)
            this.page = maxPage;
    };
    return SearchParameters;
}());
exports.SearchParameters = SearchParameters;
//# sourceMappingURL=searchparameters.js.map