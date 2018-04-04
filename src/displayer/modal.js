import { Row } from "./row.js";

export class Modal extends Row{
  constructor() {
    super();
    this.element.className = "modal";
    let uid = ""+Math.round(Math.random()*100000);
    this.element.id= `modal-${uid}`;
    $(this.element).modal();
    $(this.element).modal('hide');
  }
  set disabled(d){
  	$(this.element).modal('show');
  }
}
