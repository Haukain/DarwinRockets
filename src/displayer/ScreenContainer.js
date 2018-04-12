import { Row } from "./Row.js";

export class ScreenContainer extends Row{
  constructor() {
    super();
    this._element.className += " screenContainer";
  }
}
