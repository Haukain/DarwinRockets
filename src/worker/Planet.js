import { PhysicsPlanet } from "./PhysicsPlanet.js"
import { TerrainObject } from "./TerrainObject.js"

export class Planet extends TerrainObject {
	constructor(attraction, position, radius=30) {
		super(attraction, position);
		this._radius = radius;
	}

	createPhysicsObject() {
		let physicsPlanet = new PhysicsPlanet(this._position, this._radius);
		return physicsPlanet;
	}
	inHitBox(x,y){
		return (
			x>this._position.x-this._radius &&
			x<this._position.x+this._radius &&
			y>this._position.y-this._radius &&
			y<this._position.y+this._radius
		);
	}

	draw(ctx) {
		let oneTimePlanet = this.createPhysicsObject();
		oneTimePlanet.draw(ctx);
	}
}
