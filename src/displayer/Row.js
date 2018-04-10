import { Widget } from "./Widget.js";

export class Row extends Widget{
  constructor() {
    super();
    this._element.className = "row";
  }
}
