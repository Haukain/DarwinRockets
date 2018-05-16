import { IconButton } from "./IconButton.js";

export class FloatingButton extends IconButton{
  constructor(icon,text,n) {
    super(icon,text);
    this._element.className += ` floatingButton` + n;

  }
}
