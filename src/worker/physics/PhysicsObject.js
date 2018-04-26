import { PhysicsRocket } from './PhysicsRocket.js';

export class PhysicsObject{
	constructor(position,radius){
		if (new.target === PhysicsObject) {
	      throw new TypeError("PhysicsObject is an abstract class"); //Abstract error
	    }
		this._position = position;
		this._radius = radius;
		this._object;
		this.createObject(position,radius);
	}

	createObject(position,radius) {throw new Error("this is an abstract method")}
	update(rockets) {}

	get object(){return this._object;}
	get position(){return this._object.position;}
	get radius(){return this._radius;}
}
