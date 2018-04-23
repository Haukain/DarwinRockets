import { PhysicsBlackHole } from "./PhysicsBlackHole.js"
import { Planet } from "./Planet.js"

export class BlackHole extends Planet {
	constructor(attraction, position, radius) {
		super(attraction, position,radius);

	createPhysicsObject() {
		let physicsBlackHole = new PhysicsBlackHole(this._position, this._radius);
		return physicsBlackHole;
	}
}
