import { RoundTerrainObject } from "./RoundTerrainObject.js"
import { PhysicsStart } from "./physics/PhysicsStart.js"

export class Start extends RoundTerrainObject {
	constructor(position) {
		super(position,10);
	}
	createPhysicsObject() {
		return new PhysicsStart(this._position);
	}
	draw(context) {
			context.beginPath();
			context.arc(0,0,this._radius,0,2*Math.PI);
			context.fill();
	}
}
