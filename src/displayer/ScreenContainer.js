import { Row } from "./Row.js";

export class ScreenContainer extends Row{
  constructor(bg) {
    bg=bg||"white";
    super();
    this._element.className += ` screenContainer ${bg}-bg`;
  }
}
