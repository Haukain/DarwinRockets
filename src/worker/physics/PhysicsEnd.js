import { PhysicsObject } from "./PhysicsObject.js";

export class PhysicsEnd extends PhysicsObject{
	constructor(position){
		super(position);
		this.createObject();
	}
  createObject(){
		this._object = Matter.Bodies.circle(this._basePosition.x,this._basePosition.y,0,{isStatic : true});
	}
}
