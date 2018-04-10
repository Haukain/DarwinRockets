import { Button } from "./Button.js";

export class IconButton extends Button{
  constructor(icon,text) {
    super(text);
    this._element.className = `btn material-icons iconbutton`;
    this.icon = icon;

  }

  addChild() {}
  removeChild() {}

  set text(t) {
    this._element.title = t;
  }
  get text() {
    return this._element.title;
  }
  set icon(t) {
    this._element.textContent = t;
  }
  get icon() {
    return this._element.textContent;
  }
}
