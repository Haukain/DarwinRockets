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

	draw(ctx){
		let time = new Date().getTime();
		ctx.beginPath();
		ctx.fillStyle = this._object.render.fillStyle;
		ctx.arc(0,0,this._radius,0,2*Math.PI);
		ctx.fill();

		let grd = ctx.createRadialGradient(0,0,this._radius*1.8,0,0,this._radius*3);
		grd.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
		grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
		ctx.fillStyle = grd;

		ctx.beginPath();
		ctx.arc(0,0,this._radius*2*Math.abs(Math.sin(time/2000)),0,2*Math.PI);
		ctx.fill();
		ctx.arc(0,0,this._radius*4*Math.abs(Math.sin(time/2000 + Math.PI/2)),0,2*Math.PI);
		ctx.fill();
	}
}
