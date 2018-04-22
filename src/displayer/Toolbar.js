import { Widget } from "./Widget.js";

export class Toolbar extends Widget{
  constructor() {
    super();
    this._element.className = "toolbar";
  }
}
