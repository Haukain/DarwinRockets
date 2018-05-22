import { Modal } from "../displayer/Modal.js";
import { ExternalContent } from "../displayer/ExternalContent.js";
import { Button } from "../displayer/Button.js";

export class ExternalPopup{
  constructor(src){
    let that = this;
    this._modal = new Modal();

    this._contentW = new ExternalContent(src);
    this._buttonW = new Button("Ok","skyblue");

    this._modal.addChild(this._contentW);
    this._modal.addChild(this._buttonW);

    this._buttonW.on("click",e=>{that._close();});

    document.body.appendChild(this._modal.element);
    this._modal.show();

  }
  _close(){
    this._modal.hide();
    this._modal.destroy();
    document.body.removeChild(this._modal.element);
    delete this._modal;
  }
}
