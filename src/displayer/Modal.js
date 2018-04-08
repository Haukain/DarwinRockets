import { Row } from "./Row.js";

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
    this._disabled = true;
  }
  set disabled(d){
  	if(d)this.show();
    else this.hide()
  }
  get disabled(){
    return this._disabled;
  }
  show(){
    $(this.element).modal('show');
    this._disabled = false;
  }
  hide(){
    $(this.element).modal('hide');
    this._disabled = true;
  }
  toggle(){
    if(this._disabled)this.show();
    else this.hide();
  }
}
