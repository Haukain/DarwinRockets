import { PhysicsObstacle } from "./PhysicsObstacle.js"

export class PhysicsPlanet extends PhysicsObstacle{
	constructor(rocket,position,radius){
		super(rocket,position,radius);
	}
	createObject(position,radius){
		this._object = Matter.Bodies.circle(position.x,position.y,radius,{isStatic : true,render:{fillStyle:'#85233a'}})
		Matter.Body.setDensity(this._object,0.05);
	}
}
