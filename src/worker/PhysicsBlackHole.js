import { PhysicsObstacle } from "./PhysicsObstacle.js"

export class PhysicsBlackHole extends PhysicsObstacle{
	constructor(position,radius){
		super(position,radius);
	}
	createObject(position,radius){
		this._object = Matter.Bodies.circle(position.x,position.y,radius,{isStatic : true, render:{fillStyle:'#000000'}});
		Matter.Body.setDensity(this._object,1);
		this._object.label = "blackHole";
	}

}
