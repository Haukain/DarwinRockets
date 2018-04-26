import { Reactor } from "./worker/Reactor.js";
import { Rocket } from "./worker/Rocket.js";
import { Planet } from "./worker/Planet.js";
import { BlackHole } from "./worker/BlackHole";
import { PhysicsRocket } from "./worker/physics/PhysicsRocket.js";

// Create an engine
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;
let time = 0;

// Define canvas

// let render = Render.create({element: document.body,engine: engine});
// render.options.wireframes = false;
// render.canvas.width = document.documentElement.clientWidth -100;
// render.canvas.height = document.documentElement.clientHeight -100;
let canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');
let screenWidth = canvas.width = 1200;
let screenHeight = canvas.height = 800;
document.body.appendChild(canvas);
let starBackground = new Image();
starBackground.src = './assets/images/starBackground.png';
starBackground.loaded = false;
starBackground.onload = ()=>starBackground.loaded = true;

let objects = [];
// Rocket parameters
for(let i=0;i<3;i++){
let r = new Rocket();
  r.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
  r.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
  r.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
  r.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
  objects.push(r);
}
// let rocketBluePrint = [{ x: 0, y: 0 },{ x: 30, y: 0 },{ x: 30, y: 40 },{ x: 25, y: 50 },{ x: 15, y: 55 },{ x: 5, y: 50 },{ x: 0, y: 40 }];


// obstacle creation

for(let i = 0; i<4; i++){
  let p = new Planet({x:Math.random()*screenWidth,y:Math.random()*screenHeight},40);
  objects.push(p);
}
let b = new BlackHole({x:Math.random()*screenWidth,y:Math.random()*screenHeight},20);
objects.push(b);



let physicsObjects = objects.map(o=>o.createPhysicsObject());
for(let r of physicsObjects.filter(o=>o instanceof PhysicsRocket)) r.setPosition({x:screenWidth/2,y:screenHeight*2/3});//rocket placement
for(let o of physicsObjects){
  Matter.World.add(engine.world, o.object);
}



// check for collisions
Matter.Events.on(engine, 'collisionActive', function(event) {
  let i, currentPair, currentPart;
  let n = event.pairs.length;

  for(let i =0; i<n; i++){
    currentPair = event.pairs[i];
    for(let r of physicsObjects.filter(o=>o instanceof PhysicsRocket)){
      let m = r.object.parts.length;
      for(let j=0;j<m;j++){
        currentPart = r.object.parts[j];
        if( (currentPair.bodyA.label === currentPart.label) || (currentPair.bodyB.label === currentPart.label)){
          //console.log("collision");
        }
      }
    }

  }

});

// apply force
Matter.Events.on(engine, "beforeUpdate",e=>{
      time += 1;
      for(let o of physicsObjects){
        o.update(time,physicsObjects);
      }
});

// run the engine
//Matter.Engine.run(engine);

// old renderer run
// Render.run(render);

// New renderer
(function render() {

    //Loop
    window.requestAnimationFrame(render);
    Matter.Engine.update(engine);
    //Clear Scene
    if (starBackground.loaded){
      context.drawImage(starBackground,0,0);
    }
    else {
      context.fillStyle = '#1a233a';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    //Render Rocket



    //Render Obstacles
    for(let i = 0; i<objects.length; i++){
      if(physicsObjects[i] instanceof PhysicsRocket){
        context.save();
        context.translate(physicsObjects[i].position.x,physicsObjects[i].position.y);
        context.rotate(physicsObjects[i].angle + Math.PI);
        physicsObjects[i].draw(context);
        context.restore();
      }else{
        context.save();
        context.translate(physicsObjects[i].position.x,physicsObjects[i].position.y);
        objects[i].draw(context);
        context.restore();
      }
    }

})();
