import { Row } from "./row.js";

export class Modal extends Row{
  constructor() {
    super();
    this.element.className = "modal";
    this.disabled=true;

  }
}
