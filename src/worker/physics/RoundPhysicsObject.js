import { PhysicsObject } from "./PhysicsObject.js"

export class RoundPhysicsObject extends PhysicsObject{
	constructor(position,radius){
		super(position);
    this._radius = radius;
    this.createObject();
	}

	createObject(){
		this._object = Matter.Bodies.circle(this._basePosition.x,this._basePosition.y,this._radius,{isStatic : true});
	}

  get radius(){return this._radius;}
}
