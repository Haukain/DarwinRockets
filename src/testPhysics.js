import { Reactor } from "./worker/Reactor.js";
import { Rocket } from "./worker/Rocket.js";
import { PhysicsPlanet } from './worker/PhysicsPlanet.js';
import { PhysicsBlackHole } from './worker/PhysicsBlackHole.js';

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

// Old renderer
// let render = Render.create({element: document.body,engine: engine});
// render.options.wireframes = false;
// render.canvas.width = document.documentElement.clientWidth -100;
// render.canvas.height = document.documentElement.clientHeight -100;

// Rocket parameters

// let rocketBluePrint = [{ x: 0, y: 0 },{ x: 30, y: 0 },{ x: 30, y: 40 },{ x: 25, y: 50 },{ x: 15, y: 55 },{ x: 5, y: 50 },{ x: 0, y: 40 }];
let rocket = new Rocket();
let steadyRocket = new Rocket();
let physicsRocket = rocket.createPhysicsObject();
let steadyPhysicsRocket = steadyRocket.createPhysicsObject();

// add the rocket to the world
World.add(engine.world, [physicsRocket.object]);

// obstacle creation
let obstacle = [];
for(let i = 0; i<4; i++){
  obstacle.push(new PhysicsPlanet(physicsRocket,{x:Math.random()*1000+100,y:Math.random()*500+100},40));
}
obstacle.push(new PhysicsBlackHole(physicsRocket,{x:Math.random()*800 +400,y:Math.random()*300 +200},50));

for(let o of obstacle){
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
      for(let o of obstacle){
        o.applyGravitation();
      }
})

// run the engine
Engine.run(engine);

// old renderer run
// Render.run(render);

// New renderer
let canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth -100;
canvas.height = document.documentElement.clientHeight -100;

document.body.appendChild(canvas);

(function render() {

    let bodies = Composite.allBodies(engine.world);

    window.requestAnimationFrame(render);

    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    steadyPhysicsRocket.drawOnce(context);

    context.beginPath();

    //Render
    for (let i = 0; i < bodies.length; i += 1) {
        for(let j = 0; j<bodies[i].parts.length; j+= 1){
          if(bodies[i].parts[j].label != "rocket"){
            let vertices = bodies[i].parts[j].vertices;
            let fs = bodies[i].parts[j].render.fillStyle;
            context.beginPath();
            context.moveTo(vertices[0].x, vertices[0].y);
            for (let h = 1; h < vertices.length; h += 1) {
                context.lineTo(vertices[h].x, vertices[h].y);
            }
            context.lineTo(vertices[0].x, vertices[0].y);
            context.fillStyle =  fs;
            context.fill();
          }
        }
    }
})();
