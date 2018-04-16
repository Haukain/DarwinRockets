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
let randomX=[];let randomY=[];let randomSize=[];let randomOpacityOne=[];let randomOpacityTwo=[];let randomHue=[];let starNumb = 1000;
for(var i=0; i<=starNumb; i++) {
  randomX.push(Math.floor((Math.random()*screenWidth)+1));
  randomY.push(Math.floor((Math.random()*screenHeight)+1));
  randomSize.push(Math.floor((Math.random()*2)+1));
  randomOpacityOne.push(Math.floor((Math.random()*9)+1));
  randomOpacityTwo.push(Math.floor((Math.random()*9)+1));
  randomHue.push(Math.floor((Math.random()*360)+1));
}

// Rocket parameters

// let rocketBluePrint = [{ x: 0, y: 0 },{ x: 30, y: 0 },{ x: 30, y: 40 },{ x: 25, y: 50 },{ x: 15, y: 55 },{ x: 5, y: 50 },{ x: 0, y: 40 }];
let rocket = new Rocket();
rocket.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);

let physicsRocket = rocket.createPhysicsObject();
physicsRocket.setPosition({x:screenWidth/2,y:screenHeight*2/3});



// add the rocket to the world
World.add(engine.world, [physicsRocket.object]);

// obstacle creation
let obstacle = [];
for(let i = 0; i<4; i++){
  obstacle.push(new PhysicsPlanet(physicsRocket,{x:Math.random()*screenWidth,y:Math.random()*screenHeight},40));
}
obstacle.push(new PhysicsBlackHole(physicsRocket,{x:Math.random()*screenWidth,y:Math.random()*screenHeight},20));

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
(function render() {

    let bodies = Composite.allBodies(engine.world);

    //Loop
    window.requestAnimationFrame(render);

    //Clear Scene
    context.fillStyle = '#1a233a';
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Render background
    context.save();
    for(let i = 0;i<starNumb;i++){
      if(randomSize[i]>1) {
        context.shadowBlur = Math.floor((Math.random()*15)+5);
        context.shadowColor = "white";
      }
      context.fillStyle = "hsla("+randomHue[i]+", 30%, 80%, ."+randomOpacityOne[i]+randomOpacityTwo[i]+")";
      context.fillRect(randomX[i], randomY[i], randomSize[i], randomSize[i]);
    }
    context.restore();
    //Render bodies
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

    //Render PhysicsBlackHole Effect
    for(let o of obstacle){
      if(o.object.label == "blackHole"){
        context.save();

        var grd=context.createRadialGradient(0,0,o.radius*1.8,0,0,o.radius*2.2);
        grd.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
        context.fillStyle = grd;
        context.translate(o.position.x,o.position.y)
        context.beginPath();
        context.arc(0,0,o.radius*2*Math.abs(Math.sin(time/100)),0,2*Math.PI);
        context.fill();
        context.arc(0,0,o.radius*3*Math.abs(Math.sin(time/100 + Math.PI/2)),0,2*Math.PI);
        context.fill();

        context.restore();
      }
    }

})();
