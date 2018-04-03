import { Button } from "./button.js";

export class IconButton extends Button{
  constructor(icon,text) {
    super(text);
    this.element.className = `btn material-icons iconbutton`;
    this.icon = icon;

  }

  addChild() {}
  removeChild() {}

  set text(t) {
    this.element.title = t;
  }
  get text() {
    return this.element.title;
  }
  set icon(t) {
    this.element.textContent = t;
  }
  get icon() {
    return this.element.textContent;
  }
}
