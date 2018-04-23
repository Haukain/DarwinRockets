import { TerrainObject } from "./TerrainObject.js"

export class RoundTerrainObject extends TerrainObject {
	constructor(position,radius) {
		super(position);
		this._radius = radius;
	}
	inHitBox(x,y){
		return (
			x>this._position.x-this._radius &&
			x<this._position.x+this._radius &&
			y>this._position.y-this._radius &&
			y<this._position.y+this._radius
		);
	}

	draw(context) {
			throw "La classe TerrainObject est abstraite";
	}
  get radius(){return this._radius}
  set radius(r){this._radius=r}
}
