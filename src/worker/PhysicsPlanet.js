import { PhysicsObstacle } from "./PhysicsObstacle.js"

export class PhysicsPlanet extends PhysicsObstacle{
	constructor(position,radius){
		super(position,radius);
	}
<<<<<<< HEAD
<<<<<<< HEAD

	createObject(position,radius) {
=======
	
>>>>>>> parent of 2ced1cb... Bêtise réparée
		this._object = Matter.Bodies.circle(position.x,position.y,radius,{isStatic : true})
=======
	createObject(position,radius){
		let fs = '#bae1ff';
		if(Math.random()>0.5){
			fs = '#baffc9';
		}

		this._object = Matter.Bodies.circle(position.x,position.y,radius,{isStatic : true,render:{fillStyle:fs}})
>>>>>>> parent of 8204c67... Affichage dans Planet
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
