// Constante en provenance de la base de données

const BULLET_TASK_STANDARD: Number = 1;

const SIGNIFIER_NO_SIGNIFIER: Number = 5;

﻿export class EntryCollection {
    id: Number;
    text: String;
    bullet: Number;
    signifier: Number;
    idCollection: Number;

    constructor() {
        this.id = 0;
        this.text = "";
        this.bullet = BULLET_TASK_STANDARD;
        this.signifier = SIGNIFIER_NO_SIGNIFIER;
        this.idCollection = 0;
    }
}
