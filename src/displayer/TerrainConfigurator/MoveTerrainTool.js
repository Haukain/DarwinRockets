import { TerrainTool } from './TerrainTool.js';

export class MoveTerrainTool extends TerrainTool{
  constructor(configurator){
    super(configurator,"open_with","move");
    this._downCallback = (p,o) =>{
      for(let object of o.filter(d=>d.inHitBox(p.x,p.y))){
        console.log(object);
        object.move = {};
        object.move.px = p.x;
        object.move.py = p.y;
      }
      return o;
    };
    this._moveCallback = (p,o) =>{
      for(let object of o.filter(d=>d.move)){
        object.position.x += p.x - object.move.px;
        object.position.y += p.y - object.move.py;
        object.move.px = p.x;
        object.move.py = p.y;
      }
      return o;
    };
    this._upCallback = (p,o) =>{
      for(let object of o.filter(d=>d.move)){
        delete object.move;
      }
      return o;
    };
  }
}
