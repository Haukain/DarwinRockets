import { PhysicsPlanet } from "./PhysicsPlanet.js"
import { RoundTerrainObject } from "./RoundTerrainObject.js"

export class Planet extends RoundTerrainObject {
	constructor(attraction, position, radius=30) {
		super(position,radius);
		this._attraction = attraction||0;
		this._fillStyle = '#bae1ff';
	}

	createPhysicsObject() {
		let physicsPlanet = new PhysicsPlanet(this._position, this._radius);
		return physicsPlanet;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this._fillStyle;
		ctx.arc(0,0,this._radius,0,2*Math.PI);
		ctx.fill();
	}

	get attraction() {return this._attraction;}
	set attraction(attraction) {this._attraction = attraction;}
}
