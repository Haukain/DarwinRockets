import { TerrainObject } from "./TerrainObject.js"

export class Start extends TerrainObject {
	constructor(position) {
		super(0, position);
		this._radius = 10;
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
			context.beginPath();
			context.arc(0,0,this._radius,0,2*Math.PI);
			context.fill();
	}
}
