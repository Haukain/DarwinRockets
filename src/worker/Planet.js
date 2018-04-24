import { PhysicsPlanet } from "./PhysicsPlanet.js"
import { RoundTerrainObject } from "./RoundTerrainObject.js"

export class Planet extends RoundTerrainObject {
	constructor(attraction, position, radius=30) {
		super(position,radius);
		this._attraction = attraction||0;
	}

	createPhysicsObject() {
		let physicsPlanet = new PhysicsPlanet(this._position, this._radius);
		return physicsPlanet;
	}

	draw(ctx) {
		let oneTimePlanet = this.createPhysicsObject();
		oneTimePlanet.draw(ctx);
	}
	get attraction() {return this._attraction;}
	set attraction(attraction) {this._attraction = attraction;}
}
