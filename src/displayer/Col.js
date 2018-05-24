import { Widget } from "./Widget.js";

export class Col extends Widget{
  constructor(sm,md,lg,xl) {
    super();
    this._element.className = `colCont col-${sm} col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl}`;
  }
}
