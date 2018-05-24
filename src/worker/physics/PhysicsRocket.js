// Physic Object of the Rocket
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

	}
	get body(){return this._body;}
	get reactors(){return this._reactors};
	get object(){return this._object;}
	get position(){return this._object.position;}
	get angle(){return this._object.angle;}

	set position(position){
		Matter.Body.setPosition(this._object,position);
	}

	addPhysicsReactors(reactors){ // Adding reactors to the rocket from a reactor array
		this._reactors = reactors;
		this._object = Matter.Body.create({
			parts:[this._body].concat(this._reactors.map(d=>d.body)),
			friction: 0.1,
			frictionAir : 0.01,
			frictionStatic :0.03
		});
		this._object.label = "rocket";

	}

	selectReactor(time){ // Activate reactors after their activationTime and desactivate them after the extinctionTime
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

	applyThrusts(time){ // Applaying thrust for each reactor of the rocket
		this.selectReactor(time);
		for(let reactor of this._reactors){
			 reactor.applyThrust(this);
		}
	}
	update(time,objects){
		this.applyThrusts(time);
	}

	draw(ctx){ // Drawing the rocket
		ctx.beginPath();
		ctx.fillStyle = this._object.parts[1].render.fillStyle
		ctx.moveTo(this._vertices[0].x,this._vertices[0].y);
		for (let i = 1; i < this._vertices.length; i += 1) {
				ctx.lineTo(this._vertices[i].x,this._vertices[i].y);
		}
		ctx.lineTo(this._vertices[0].x,this._vertices[0].y);
		ctx.fill();

		for(let r of this._reactors){ //Drawing each of the reactors
			ctx.save();
			ctx.scale(r.scale,r.scale);
			ctx.translate(r.position.x,r.position.y);
			ctx.rotate(r.angle + Math.PI);
			r.draw(ctx);
			ctx.restore();
		}

	}

}
