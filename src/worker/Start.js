import { RoundTerrainObject } from "./RoundTerrainObject.js"
import { PhysicsStart } from "./physics/PhysicsStart.js"

export class Start extends RoundTerrainObject {
	static fromStructure(s){
		return new Start(s.position);
	}
	constructor(position) {
		super(position,10);
	}
	createPhysicsObject() {
		return new PhysicsStart(this._position);
	}
	draw(context) {
			context.beginPath();
			context.fillStyle = 'red';
			context.arc(0,0,this._radius,0,2*Math.PI);
			context.fill();
	}
}
