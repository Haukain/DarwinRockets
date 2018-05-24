import { PhysicsObject } from "./PhysicsObject.js";

// Physic object of the End point
export class PhysicsEnd extends PhysicsObject{
	constructor(position){
		super(position);
		this.createObject();
	}
  createObject(){
		this._object = Matter.Bodies.circle(this._basePosition.x,this._basePosition.y,0,{isStatic : true});
	}
}
