import { RoundTerrainObject } from "./RoundTerrainObject.js"
import { PhysicsEnd } from "./physics/PhysicsEnd.js"

export class End extends RoundTerrainObject {
	static fromStructure(s){
		return new End(s.position);
	}
	constructor(position) {
		super(position,10);
	}
	createPhysicsObject() {
		return new PhysicsEnd(this._position);
	}
	draw(context) {
		context.beginPath();
		context.fillStyle = 'red';
		context.arc(0,0,this._radius,0,2*Math.PI);
		context.fill();
	}
}
