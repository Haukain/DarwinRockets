import { RoundTerrainObject } from "./RoundTerrainObject.js"

export class Start extends RoundTerrainObject {
	constructor(position) {
		super(position,10);
	}
	draw(context) {
			context.beginPath();
			context.arc(0,0,this._radius,0,2*Math.PI);
			context.fill();
	}
}
