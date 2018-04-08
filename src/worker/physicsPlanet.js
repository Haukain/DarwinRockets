import { PhysicsObstacle } from "./physicsobstacle.js"

export class PhysicsPlanet extends PhysicsObstacle{
	constructor(rocket,position,radius){
		super(rocket,position,radius);
		Matter.Body.setDensity(this._object,0.07);
	}
}