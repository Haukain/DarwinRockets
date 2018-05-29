// Physic Object of the reactor
export class PhysicsReactor{
  constructor(blueprint,reactorRender,position,thrust,activationTime,extinctionTime,angle){
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
    this.active = false;
    this._vertices = blueprint;
    this._scale = 2500*this._thrust;
    this._body = Matter.Body.create({
      vertices: blueprint,
      render: reactorRender,
    });
    this._body.label = "reactorBody";
    Matter.Body.scale(this._body,this._scale,this._scale);
    Matter.Body.setPosition(this._body,this._position);
    Matter.Body.setAngle(this._body, this._angle);
  }
  get scale(){return this._scale;}
  get position(){return this._position;}
  get angle(){return this._angle;}
  get thrust(){return this._thrust;}
  get body(){return this._body;}
  get activationTime(){return this._activationTime;}
  get extinctionTime(){return this._extinctionTime;}
  extinctionTimeReduction(){ this._extinctionTime -= 1/60;}

  applyThrust(rocket){
    if(!this.active){
      this._body.render.fillStyle =  '#913748'
      return
    };
    this._body.render.fillStyle = '#ffb7d4';
    let thrustVector = {
      x : Math.cos(this._angle+rocket.object.angle+Math.PI/2)*this._thrust,
      y : Math.sin(this._angle+rocket.object.angle+Math.PI/2)*this._thrust
    }
    Matter.Body.applyForce(rocket.object,{x: this._body.position.x, y: this._body.position.y},thrustVector);
  }

  draw(ctx){
    ctx.beginPath();
		ctx.fillStyle = this._body.render.fillStyle
		ctx.moveTo(this._vertices[0].x,this._vertices[0].y);
		for (let i = 1; i < this._vertices.length; i += 1) {
				ctx.lineTo(this._vertices[i].x,this._vertices[i].y);
		}
		ctx.lineTo(this._vertices[0].x,this._vertices[0].y);
		ctx.fill();
    ctx.stroke();
  }

}
