import { Button } from "./Button.js";

export class IconButton extends Button{
  constructor(icon,text,color) {
    super(text,color);
    let n=0;
    if (color==1){n=1}
    this._element.className = `btn material-icons iconbutton`+n;
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
