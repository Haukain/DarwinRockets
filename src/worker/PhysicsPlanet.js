import { PhysicsObstacle } from "./PhysicsObstacle.js"

export class PhysicsPlanet extends PhysicsObstacle{
	constructor(rocket,position,radius){
		super(rocket,position,radius);
		Matter.Body.setDensity(this._object,0.07);
	}
}
