import { Widget } from "../Widget.js";

export class NavbarItem extends Widget{
  constructor() {
    super();
    this._element = document.createElement("LI");
    this._innerElement = this._element;
    this._element.className = "nav-item";
  }
}
