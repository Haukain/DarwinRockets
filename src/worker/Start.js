import { TerrainObject } from "./TerrainObject.js"

export class Start extends TerrainObject {
	constructor(position) {
		super(0, position);
		this._radius = 10;
	}

	draw(context) {
			context.beginPath();
			context.arc(0,0,this._radius,0,2*Math.PI);
			context.fill();
	}
}
