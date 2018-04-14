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
		for(let rd of reactorDefinitions) this._reactors.push(new PhysicsReactor(blueprint,reactorRender,rd.position,rd.thrust,rd.activationTime,rd.extinctionTime,rd.angle));

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

	selectReactor(time){
		for(let r of this._reactors){
			if(time>=r.activationTime){
				r.active = true;
			}
			if(r.active){
				if(r.extinctionTime<=0){
					r.active = false;
				} else {
					r.extinctionTimeReduction();
				}
			}
		}
	}

	applyThrusts(time){
		this.selectReactor(time);
		for(let reactor of this._reactors){
			 reactor.applyThrust(this);
		}
	}

	drawOnce(ctx){
		let oneTimeEngine = Matter.Engine.create();
    oneTimeEngine.world.gravity.y = 0;
		Matter.Body.setPosition(this._object,{x:50,y:50});
    Matter.World.add(oneTimeEngine.world, [this._object]);

    Matter.Engine.run(oneTimeEngine);

		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, 1500, 1500);

		for(let i = 0;i<this._object.parts.length;i++){
			if(this._object.parts[i].label != "rocket"){
				let vertices = this._object.parts[i].vertices;
				let fs = this._object.parts[i].render.fillStyle;
				ctx.beginPath();
				ctx.moveTo(vertices[0].x, vertices[0].y);
				for (let j = 1; j < vertices.length; j += 1) {
						ctx.lineTo(vertices[j].x, vertices[j].y);
				}
				ctx.lineTo(vertices[0].x, vertices[0].y);
				ctx.fillStyle = fs;
				ctx.fill();
			}
		}
	}
}
