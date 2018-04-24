import { PhysicsBlackHole } from "./PhysicsBlackHole.js"
import { Planet } from "./Planet.js"

export class BlackHole extends Planet {
	constructor(position, radius) {
		super(position,radius);
		this._fillStyle = '#000000';
	}

	createPhysicsObject() {
		let physicsBlackHole = new PhysicsBlackHole(this._position, this._radius);
		return physicsBlackHole;
	}

	draw(ctx){
		let time = new Date().getTime();
		ctx.beginPath();
		ctx.fillStyle = this._fillStyle;
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
