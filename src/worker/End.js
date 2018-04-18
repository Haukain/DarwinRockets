import { TerrainObject } from "./TerrainObject"

export class End extends TerrainObject {
	constructor(attraction, position) {
		super(attraction, position);
		this._radius = 10;
	}

	draw(attraction, position, radius, context) {
		context.translate(position.x,position.y)
		context.beginPath();
		context.arc(0,0,radius,0,2*Math.PI);
		context.fill();
	}
}
