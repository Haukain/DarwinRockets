import { Row } from "./row.js";

export class Modal extends Row{
  constructor() {
    super();
    this.element.className = "modal";
    let uid = ""+Math.round(Math.random()*100000);
    this.element.id= `modal-${uid}`;
    //Modal-dialog
    this._dialog = document.createElement("DIV");
    this._dialog.className = "modal-dialog";
    this.element.appendChild(this._dialog);
    //Modal-content
    this._content = document.createElement("DIV");
    this._content.className = "modal-content";
    this._dialog.appendChild(this._content);
    //Modal-body
    this.innerElement = document.createElement("DIV");
    this.innerElement.className = "modal-body";
    this._content.appendChild(this.innerElement);

    $(this.element).modal();
    $(this.element).modal('hide');
  }
  set disabled(d){
  	$(this.element).modal('show');
  }
}
