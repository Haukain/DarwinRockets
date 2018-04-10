import { PhysicsObstacle } from "./PhysicsObstacle.js"

export class PhysicsBlackHole extends PhysicsObstacle{
	constructor(rocket,position,radius){
		super(rocket,position,radius);
	}
	createObject(position,radius){
		this._object = Matter.Bodies.circle(position.x,position.y,radius,{isStatic : true, render:{fillStyle:'#1a233a',lineWidth:0.1}});
		Matter.Body.setDensity(this._object,1);
	}
}
