import { Widget } from "./Widget.js";

export class Col extends Widget{
  constructor(sm,md,lg,xl) {
    super();
    this._element.className = `col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl}`;
  }
}
