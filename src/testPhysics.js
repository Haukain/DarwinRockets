import { PhysicsRocket } from './worker/PhysicsRocket.js';
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

// Create a renderer
let render = Render.create({element: document.body,engine: engine});
render.options.wireframes = false;
render.canvas.width = document.documentElement.clientWidth -100;
render.canvas.height = document.documentElement.clientHeight -100;

// Rocket parameters
let rocketInitialPosition = {x:document.documentElement.clientWidth/2,y:document.documentElement.clientHeight*2/3}
// let rocketBluePrint = [{ x: 0, y: 0 },{ x: 30, y: 0 },{ x: 30, y: 40 },{ x: 25, y: 50 },{ x: 15, y: 55 },{ x: 5, y: 50 },{ x: 0, y: 40 }];
let rocketBluePrint = Vertices.fromPath('-9 -20 -9 0 -7 15 -4 30 -3 33 -2 35 0 36 2 35 3 33 4 30 7 15 9 0 9 -20');
let rocketRender = {
         fillStyle: '#85bce6',
         strokeStyle: 'invisible',
         lineWidth: 0.2
};
let reactorRender = {
         fillStyle: '#d65b73',
         strokeStyle: 'invisible',
         lineWidth: 0.2
};

// Create rocket parts

  let rocket = new PhysicsRocket(rocketBluePrint,rocketRender,reactorRender,rocketInitialPosition,[
    {position:{x:Math.random()*15-8,y:Math.random()*40 -10},angle:Math.random()*3-1.5+Math.PI,thrust:0.00015*(Math.random()+1),capacity:300*Math.random()+150},
    {position:{x:Math.random()*15-8,y:Math.random()*40 -10},angle:Math.random()*3-1.5+Math.PI,thrust:0.00015*(Math.random()+1),capacity:300*Math.random()+150},
    {position:{x:Math.random()*15-8,y:Math.random()*40 -10},angle:Math.random()*3-1.5+Math.PI,thrust:0.00015*(Math.random()+1),capacity:300*Math.random()+150},
    {position:{x:Math.random()*15-8,y:Math.random()*40 -10},angle:Math.random()*3-1.5+Math.PI,thrust:0.00015*(Math.random()+1),capacity:300*Math.random()+150},
  ]);

// add the rocket to the world
World.add(engine.world, [rocket.object]);

// obstacle creation
let obstacle = [];
for(let i = 0; i<4; i++){
  obstacle.push(new PhysicsPlanet(rocket,{x:Math.random()*1000+100,y:Math.random()*500+100},40));
}
obstacle.push(new PhysicsBlackHole(rocket,{x:Math.random()*800 +400,y:Math.random()*300 +200},50));

for(let o of obstacle){
  World.add(engine.world, o.object);
}


// check for collisions
Matter.Events.on(engine, 'collisionActive', function(event) {
  let i, currentPair, currentPart;
  let n = event.pairs.length;
  let m = rocket.object.parts.length

  for(let i =0; i<n; i++){
    currentPair = event.pairs[i];
    for(let j=0;j<m;j++){
      currentPart = rocket.object.parts[j];
      if( (currentPair.bodyA.label === currentPart.label) || (currentPair.bodyB.label === currentPart.label)){
        console.log("collision");
      }
    }

  }

});

// apply force
Events.on(engine, "beforeUpdate",e=>{
      rocket.applyThrusts();
      for(let o of obstacle){
        o.applyGravitation();
      }
})

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);