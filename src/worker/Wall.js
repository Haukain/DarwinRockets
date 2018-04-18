import { PhysicsPlanet } from "./PhysicsPlanet.js"
import { TerrainObject } from "./TerrainObject.js"

export class Wall extends TerrainObject {
	constructor(attraction, position, radius) {
		super(attraction, position);
		this._radius = radius;
	}

	createPhysicsObject() {
		let physicsPlanet = new PhysicsPlanet(this._position, this._radius);
		return physicsPlanet;
	}

	draw() {}
}
