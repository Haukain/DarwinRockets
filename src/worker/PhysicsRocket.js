export class PhysicsRocket{
	constructor(blueprint,rocketRender){
		this._reactors = [];
		this._object;
		this._body = Matter.Body.create({
				vertices: blueprint,
				render: rocketRender,
		});
		this._body.label = "rocketBody";
			Matter.Body.setAngle(this._body, Math.PI);

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

	setPosition(position){
		Matter.Body.setPosition(this._object,position);
	}

	addPhysicsReactor(reactors){
		this._reactors = reactors;
		this._object = Matter.Body.create({
			parts:[this._body].concat(this._reactors.map(d=>d.body)),
			friction: 0.1,
			frictionAir : 0.01,
			frictionStatic :0.03
		});
		this._object.label = "rocket";

	}

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
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, 100, 100);

		let offset = {x:this._object.position.x-50,y:this._object.position.y-50}
		for(let i = 0;i<this._object.parts.length;i++){
			if(this._object.parts[i].label != "rocket"){
				let vertices = this._object.parts[i].vertices;
				let fs = this._object.parts[i].render.fillStyle;
				ctx.beginPath();
				ctx.moveTo(vertices[0].x  - offset.x, vertices[0].y - offset.y);
				for (let j = 1; j < vertices.length; j += 1) {
						ctx.lineTo(vertices[j].x - offset.x, vertices[j].y - offset.y);
				}
				ctx.lineTo(vertices[0].x - offset.x, vertices[0].y - offset.y);
				ctx.fillStyle = fs;
				ctx.fill();
			}
		}
	}
}
