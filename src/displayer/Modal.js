import { Row } from "./Row.js";

export class Modal extends Row{
  constructor() {
    super();
    this._element.className = "modal";
    let uid = ""+Math.round(Math.random()*100000);
    this._element.id= `modal-${uid}`;
    //Modal-dialog
    this._dialog = document.createElement("DIV");
    this._dialog.className = "modal-dialog";
    this._element.appendChild(this._dialog);
    //Modal-content
    this._content = document.createElement("DIV");
    this._content.className = "modal-content";
    this._dialog.appendChild(this._content);
    //Modal-body
    this._innerElement = document.createElement("DIV");
    this._innerElement.className = "modal-body";
    this._content.appendChild(this._innerElement);

    $(this._element).modal();
    $(this._element).modal('hide');
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
