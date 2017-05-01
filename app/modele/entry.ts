// Constante en provenance de la base de données

const BULLET_TASK_STANDARD: Number = 1;

const SIGNIFIER_NO_SIGNIFIER: Number = 5;

﻿export class Entry {
    id: Number;
    type: Number;
    text: String;
    bullet: Number;
    signifier: Number;
    date: Date;
    monthly: Boolean;
    futur: Boolean;
    day: Number;

    constructor() {
        this.id = 0;
        this.text = "";
        this.bullet = BULLET_TASK_STANDARD;
        this.signifier = SIGNIFIER_NO_SIGNIFIER;
        this.date = new Date();
        this.monthly = false;
        this.futur=false;
    }

    getType(): string {
      if(this.monthly) {
        if(this.futur) return "Monthly";
        return "Month";
      }
      if(this.futur) return "Futur";
      return "Daily";
    }
}
