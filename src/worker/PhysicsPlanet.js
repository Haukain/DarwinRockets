import { PhysicsObstacle } from "./PhysicsObstacle.js"

export class PhysicsPlanet extends PhysicsObstacle{
	constructor(rocket,position,radius){
		super(rocket,position,radius);
	}
	createObject(position,radius){
		let fs = '#bae1ff';
		if(Math.random()>0.5){
			fs = '#baffc9';
		}

		this._object = Matter.Bodies.circle(position.x,position.y,radius,{isStatic : true,render:{fillStyle:fs}})
		Matter.Body.setDensity(this._object,0.005);
		this._object.label = "planet";
	}
}
