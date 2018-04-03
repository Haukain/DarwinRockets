import { Widget } from "./widget.js";

export class Col extends Widget{
  constructor(sm,md,lg,xl) {
    super();
    this.element.className = `col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl}`;
  }
}
