import { PhysicsObstacle } from "./physicsobstacle.js"

export class PhysicsBlackhole extends PhysicsObstacle{
	constructor(rocket,position,radius){
		super(rocket,position,radius);
		Matter.Body.setDensity(this._object,0.90);
		this._object.render.fillStyle ='#1a233a';
		this._object.render.strokeStyle ='invisible';
		this._object.render.lineWidth = 0.1 ;
	}
}