import { Row } from "./row.js";

export class Modal extends Row{
  constructor() {
    super();
    this.element.className = "modal";
    this.disabled=true;


  }
  set disabled(d){
  	if (!d){
  		this.element.className = "modal fade show";
  	}
  	else {this.element.className = "modal";}
  }
}
