import { Widget } from "../widget.js";

export class NavbarItem extends Widget{
  constructor() {
    super();
    this.element = document.createElement("LI");
    this.innerElement = this.element;
    this.element.className = "nav-item";
  }
}
