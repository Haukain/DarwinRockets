import { Reactor } from "./worker/Reactor.js";
import { Rocket } from "./worker/Rocket.js";
import { Planet } from "./worker/Planet.js";
import { BlackHole } from "./worker/BlackHole";

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    Events = Matter.Events,
      Vertices = Matter.Vertices;

// Create an engine
let engine = Engine.create();
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

// Rocket parameters

// let rocketBluePrint = [{ x: 0, y: 0 },{ x: 30, y: 0 },{ x: 30, y: 40 },{ x: 25, y: 50 },{ x: 15, y: 55 },{ x: 5, y: 50 },{ x: 0, y: 40 }];
let rocket = new Rocket();
rocket.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
rocket.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
rocket.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
rocket.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);

let physicsRocket = rocket.createPhysicsObject();
physicsRocket.setPosition({x:screenWidth/2,y:screenHeight*2/3});


// add the rocket to the world
World.add(engine.world, [physicsRocket.object]);

// obstacle creation
let obstacle = [];
let physicsObstacle = [];

for(let i = 0; i<4; i++){
  let p = new Planet({x:Math.random()*screenWidth,y:Math.random()*screenHeight},40);
  obstacle.push(p);
  physicsObstacle.push(p.createPhysicsObject());
}
let b = new BlackHole({x:Math.random()*screenWidth,y:Math.random()*screenHeight},20);
obstacle.push(b);
physicsObstacle.push(b.createPhysicsObject());

for(let o of physicsObstacle){
  World.add(engine.world, o.object);
}



// check for collisions
Matter.Events.on(engine, 'collisionActive', function(event) {
  let i, currentPair, currentPart;
  let n = event.pairs.length;
  let m = physicsRocket.object.parts.length

  for(let i =0; i<n; i++){
    currentPair = event.pairs[i];
    for(let j=0;j<m;j++){
      currentPart = physicsRocket.object.parts[j];
      if( (currentPair.bodyA.label === currentPart.label) || (currentPair.bodyB.label === currentPart.label)){
        console.log("collision");
      }
    }

  }

});

// apply force
Events.on(engine, "beforeUpdate",e=>{
      time += 1;
      physicsRocket.applyThrusts(time);
      for(let o of physicsObstacle){
        o.applyGravitation(physicsRocket);
      }
})

// run the engine
Engine.run(engine);

// old renderer run
// Render.run(render);

// New renderer
(function render() {

    let bodies = Composite.allBodies(engine.world);

    //Loop
    window.requestAnimationFrame(render);

    //Clear Scene
    if (starBackground.loaded){
      context.drawImage(starBackground,0,0);
    }
    else {
      context.fillStyle = '#1a233a';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    //Render Rocket
    context.save();
    context.translate(physicsRocket.object.position.x,physicsRocket.object.position.y);
    context.rotate(physicsRocket.object.angle + Math.PI);
    physicsRocket.draw(context);
    context.restore();


    //Render Obstacles
    for(let i = 0; i<obstacle.length; i++){
      context.save();
      context.translate(physicsObstacle[i].position.x,physicsObstacle[i].position.y);
      obstacle[i].draw(context);
      context.restore();
    }

})();
