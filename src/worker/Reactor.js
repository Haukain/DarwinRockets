import { PhysicsReactor } from "./physics/PhysicsReactor.js"

export class Reactor {
	constructor(position, thrust, activationTime, extinctionTime, angle){
		this._position = {x:0,y:0};
    if(position.x<10 && position.x>-10){ this._position.x = position.x;}
    else if(position.x>10){ this._position.x = 10;}
    else {this._position.x = -10; }
    if(position.y<35 && position.y>-20){ this._position.y = position.y;}
    else if(position.y>35){ this._position.y = 35;}
    else {this._position.y = -20; }
		this._angle = angle;
    this._thrust = thrust<(1/2500)?thrust:(1/2500);
		this._activationTime = activationTime>0?activationTime:0;
    this._extinctionTime = extinctionTime;
	}

	draw(ctx) {
		let blueprint =  Matter.Vertices.fromPath('-9 -20 -9 0 -7 15 -4 30 -3 33 -2 35 0 36 2 35 3 33 4 30 7 15 9 0 9 -20');
		let render = {
			fillStyle: '#913748',
		};
		let oneTimeObject = this.createPhysicsObject(blueprint,render);
		oneTimeObject.draw(ctx);
	}

	createPhysicsObject(blueprint,reactorRender) {
		return new PhysicsReactor(blueprint,reactorRender,this._position,this._thrust,this._activationTime,this._extinctionTime,this._angle)
	}

	get position() {return this._position;}

	get thrust() {return this._thrust;}

	get activationTime() {return this._activationTime;}

	get extinctionTime() {return this._extinctionTime;}

	get angle() {return this._angle;}

	toStructure(){
		return {
			position:{x:this._position.x,y:this._position.y},
			thrust:this._thrust,
			activationTime:this._activationTime,
			extinctionTime:this._extinctionTime,
			angle:this._angle
		};
	}
}
