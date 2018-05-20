import { PhysicsStart } from "./PhysicsStart.js";

export class PhysicsComputer {
	constructor(terrain,rockets, simDuration=20){
		this._simDuration = simDuration;
		this._rockets = rockets.map(r=>r.createPhysicsObject());
		this._objects = terrain.objects.map(r=>r.createPhysicsObject()).concat(this._rockets);
		let startPoint = this._objects.filter(o=>o instanceof PhysicsStart)[0];
		for(let r of this._rockets)r.position ={x:startPoint.position.x,y:startPoint.position.y};
		// -- Matter JS stuff -- //
		// Create an engine
		this._engine = Matter.Engine.create();
		this._engine.world.gravity.y = 0;
		this._time = 0;
		//add object to engine
		for(let o of this._objects){
		  Matter.World.add(this._engine.world, o.object);
		}
		//collision detection
		let that = this;
		Matter.Events.on(this._engine, 'collisionActive', function(event) {
		  let i, currentPair, currentPart;
		  let n = event.pairs.length;
		  for(let i =0; i<n; i++){
		    currentPair = event.pairs[i];
		    for(let r of that._rockets){
		      let m = r.object.parts.length;
		      for(let j=0;j<m;j++){
		        currentPart = r.object.parts[j];
		        if( (currentPair.bodyA.label === currentPart.label) || (currentPair.bodyB.label === currentPart.label)){
							that._time = that._simDuration;
		        }
		      }
		    }
		  }
		});
		//update objects
		Matter.Events.on(this._engine, "beforeUpdate",e=>{
		      that._time += 1/60;
		      for(let o of that._objects){
		        o.update(that._time,that._objects);
		      }
		});
	}

	update() {
		Matter.Engine.update(this._engine);
	}

	isEnded() {
		return this._time>=this._simDuration;
	}

	get simDuration() {return this._simDuration;}// read only
	get time() {return this._time;}// read only

	get rockets() {return this._rockets;}
}
