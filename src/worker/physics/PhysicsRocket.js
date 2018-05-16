export class PhysicsRocket{
	constructor(blueprint,rocketRender){
		this._reactors = [];
		this._object;
		this._body = Matter.Body.create({
				vertices: blueprint,
				render: rocketRender,
		});
		this._vertices = blueprint;
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
	get position(){return this._object.position;}
	get angle(){return this._object.angle;}

	set position(position){
		Matter.Body.setPosition(this._object,position);
	}

	addPhysicsReactors(reactors){
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
	update(time,objects){
		this.applyThrusts(time);
	}

	draw(ctx){
		ctx.beginPath();
		ctx.fillStyle = this._object.parts[1].render.fillStyle
		ctx.moveTo(this._vertices[0].x,this._vertices[0].y);
		for (let i = 1; i < this._vertices.length; i += 1) {
				ctx.lineTo(this._vertices[i].x,this._vertices[i].y);
		}
		ctx.lineTo(this._vertices[0].x,this._vertices[0].y);
		ctx.fill();
		let imgRocket = new Image();
		imgRocket.src = './assets/images/rocket.png';
		ctx.save();
		ctx.rotate(3*Math.PI/4);
		ctx.drawImage(imgRocket,-20,-45,60,60);
		ctx.restore();

		for(let r of this._reactors){
			ctx.save();
			ctx.scale(r.scale,r.scale);
			ctx.translate(r.position.x,r.position.y);
			ctx.rotate(r.angle + Math.PI);
			r.draw(ctx);
			let imgReactor = new Image();
			imgReactor.src = './assets/images/reactor.png';
			ctx.save();
			ctx.rotate(Math.PI);
			ctx.drawImage(imgReactor,-20,-45,40,40);
			ctx.restore();
			ctx.restore();
		}

	}

}
