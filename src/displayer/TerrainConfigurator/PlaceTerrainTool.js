import { TerrainTool } from './TerrainTool.js';

export class PlaceTerrainTool extends TerrainTool{
  constructor(configurator,icon,name,objectConstructor){
    super(configurator,icon,"place "+name);
    this._objectConstructor = objectConstructor;
    let that = this;
    this._downCallback = (p,o) =>{
      let object = new that._objectConstructor();
      object.position.x = p.x;
      object.position.y = p.y;
      o.push(object);
      return o;
    };
    this._moveCallback = (p,o) =>o;
    this._upCallback = (p,o) =>o;
  }
}
