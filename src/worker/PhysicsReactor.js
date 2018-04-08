export class PhysicsReactor{
  constructor(blueprint,reactorRender,position,angle,thrust,capacity){
    this._position = position;
    this._angle = angle;
    this._thrust = thrust;
    this._capacity = capacity;
    this.active = false;
    this._body = Matter.Body.create({
      vertices: blueprint,
      render: reactorRender,
    });
    this._body.label = "reactorBody";
    Matter.Body.scale(this._body,2000*this._thrust,2000*this._thrust);
    Matter.Body.setPosition(this._body,this._position);
    Matter.Body.setAngle(this._body, this._angle);
  }
  get position(){return this._position;}
  get angle(){return this._angle;}
  get thrust(){return this._thrust;}
  get body(){return this._body;}
  get capacity(){return this._capacity;}
  setCapacity(){this._capacity -= 1};
  applyThrust(rocket){
    if(!this.active){
      this._body.render.fillStyle =  '#d65b73'
      return
    };
    this._body.render.fillStyle = '#1a233a';
    let thrustVector = {
      x : Math.cos(this._angle+rocket.object.angle+Math.PI/2)*this._thrust,
      y : Math.sin(this._angle+rocket.object.angle+Math.PI/2)*this._thrust
    }
    Matter.Body.applyForce(rocket.object,{x: this._body.position.x, y: this._body.position.y},thrustVector);
  }
}
