import { PhysicsObstacle } from "./PhysicsObstacle.js"

export class PhysicsPlanet extends PhysicsObstacle{
	constructor(position,radius){
		super(position,radius);
	}
	createObject(position,radius){
		let fs = '#bae1ff';

		this._object = Matter.Bodies.circle(position.x,position.y,radius,{isStatic : true,render:{fillStyle:fs}})
		Matter.Body.setDensity(this._object,0.005);
		this._object.label = "planet";
	}

	draw(ctx){
		ctx.beginPath();
		ctx.fillStyle = this._object.render.fillStyle;
		ctx.arc(0,0,this._radius,0,2*Math.PI);
		ctx.fill();
	}
}
