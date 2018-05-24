import { PhysicsPlanet } from "./PhysicsPlanet.js"

// Physic object of the black hole
export class PhysicsBlackHole extends PhysicsPlanet{
	constructor(position,radius){
		super(position,radius);
		Matter.Body.setDensity(this._object,1); // Max density
		this._object.label = "blackHole";
	}
}
