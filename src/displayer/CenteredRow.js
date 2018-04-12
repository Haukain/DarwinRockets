import { Row } from "./Row.js";

export class CenteredRow extends Row{
  constructor() {
    super();
    this._element.className += " centeredVH";
  }
}
