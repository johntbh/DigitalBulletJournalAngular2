export class SearchParameters {
    text: String;
    bullets: Number[];
    signifiers: Number[];
    types: Number[];
    dateStart: Date;
    dateEnd: Date;

    page: number;
    maxRows: number;
    rowsOnPage: Number;
    rowsPossible: Number[] = [5,10,15,25,50,100];

    constructor() {
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

    isEmpty(): boolean {
      return (this.text.trim() === "" && this.bullets.length === 0 && this.signifiers.length === 0 && this.types.length === 0 && this.dateStart === null && this.dateEnd === null)
    }

    getPage(): number {
      this.refreshPage()
      return this.page;
    }

    getMaxPage(): number {
      return Math.ceil(this.maxRows / this.rowsOnPage.valueOf());
    }

    refreshPage(): void {
      var maxPage = this.getMaxPage();
      if(this.page > maxPage) this.page = maxPage;
    }
}
