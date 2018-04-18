import { IconButton } from "./IconButton.js";

export class FloatingButton extends IconButton{
  constructor(icon,text) {
    super(icon,text);
    this._element.className += ` floatingButton`;

  }
}
