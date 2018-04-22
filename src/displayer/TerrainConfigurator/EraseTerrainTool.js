import { TerrainTool } from './TerrainTool.js';

export class EraseTerrainTool extends TerrainTool{
  constructor(configurator){
    super(configurator,"remove","erase");
    this._downCallback = (p,o) =>{
      for(let object of o.filter(d=>d.inHitBox(p.x,p.y))){
        o.splice(o.indexOf(object),1);
      }
      return o;
    };
    this._moveCallback = (p,o) =>o;
    this._upCallback = (p,o) =>o;
  }
}
