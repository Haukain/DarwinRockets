import { Widget } from "./widget.js";

export class Row extends Widget{
  constructor() {
    super();
    this.element.className = "row";
  }
}
