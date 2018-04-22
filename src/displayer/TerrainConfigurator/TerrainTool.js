import { IconButton } from '../IconButton.js';

export class TerrainTool{
  constructor(configurator,icon,name){
    let that = this;
    this._configurator = configurator;
    this._button = new IconButton(icon,name);
    this._button.on("click",()=>{
      that._configurator.selectTool(that);
    })
    this._downCallback = (p,o) =>{throw new Error("callback undefined :/");};
    this._moveCallback = this._downCallback;
    this._upCallback = this._downCallback;
  }
  get button(){return this._button}
  get downCallback(){return this._downCallback}
  get moveCallback(){return this._moveCallback}
  get upCallback(){return this._upCallback}
}
