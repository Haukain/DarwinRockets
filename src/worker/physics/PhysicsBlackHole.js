import { PhysicsPlanet } from "./PhysicsPlanet.js"

export class PhysicsBlackHole extends PhysicsPlanet{
	constructor(position,radius){
		super(position,radius);
		Matter.Body.setDensity(this._object,1);
		this._object.label = "blackHole";
	}
}
