import { PhysicsBlackHole } from "./PhysicsBlackHole.js"
import { TerrainObject } from "./TerrainObject.js"

export class BlackHole extends TerrainObject {
	constructor(attraction, position, radius) {
		super(attraction, position);
		this._radius = radius;

	createPhysicsObject() {
		let physicsBlackHole = new PhysicsBlackHole(this._position, this._radius);
		return physicsBlackHole;
	}

	draw() {}
}
