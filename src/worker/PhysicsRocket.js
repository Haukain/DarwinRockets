import { PhysicsReactor } from "./PhysicsReactor.js"

export class PhysicsRocket{
	constructor(blueprint,rocketRender,reactorRender,position,reactorDefinitions){
		this._body = Matter.Body.create({
				vertices: blueprint,
				render: rocketRender,
		});
		this._body.label = "rocketBody";
			Matter.Body.setAngle(this._body, Math.PI);

		this._reactors = [];
		for(let rd of reactorDefinitions) this._reactors.push(new PhysicsReactor(blueprint,reactorRender,rd.position,rd.angle,rd.thrust,rd.capacity));

		this._object = Matter.Body.create({
			parts:[this._body].concat(this._reactors.map(d=>d.body)),
			friction: 0.1,
			frictionAir : 0.01,
			frictionStatic :0.03
		});

		this._object.label = "rocket";
		Matter.Body.setPosition(this._object,position);

		//manual controls
		// document.body.addEventListener("keydown",e=>{
		//   if(e.keyCode-49>=0 && e.keyCode-49<9){
		//   	if (this._reactors[e.keyCode-49]){
		//   	this._reactors[e.keyCode-49].active = true;
		//   	}
		//   }
		// },false);
		// document.body.addEventListener("keyup",e=>{
		//   if(e.keyCode-49>=0 && e.keyCode-49<9){
		//   	if (this._reactors[e.keyCode-49]){
		//   		this._reactors[e.keyCode-49].active = false;
		//   	}
		//   }
		// },false);

	}
	get body(){return this._body;}
	get reactors(){return this._reactors};
	get object(){return this._object;}

	selectReactor(randomReactor){
		let activeReactors = 0;
		for(let r of this._reactors){
			if(r.active){
				if(r.capacity<=0){
					r.active = false;
				} else {
					activeReactors += 1;
					r.setCapacity();
				}
			}
		}
		if(activeReactors<2 && this._reactors[randomReactor].capacity>0){
			this._reactors[randomReactor].active = true;
		}
	}

	applyThrusts(randomReactor){
		this.selectReactor(randomReactor);
		for(let reactor of this._reactors){
			 reactor.applyThrust(this);
		}
	}
}
