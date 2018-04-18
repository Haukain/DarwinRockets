import { TerrainObject } from "./TerrainObject"

export class End extends TerrainObject {
	constructor(attraction, position) {
		super(attraction, position);
		this._radius = 10;
	}

	draw(context) {
		context.beginPath();
		context.arc(0,0,this._radius,0,2*Math.PI);
		context.fill();
	}
}
