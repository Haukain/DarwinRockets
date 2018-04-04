import { Widget } from "../widget.js";

export class Navbar extends Widget{
  constructor() {
    super();
    this.element.className = "navbar navbar-expand-lg navbar-light bg-light bd-navbar";
  }
}
