import { Terrain } from "./worker/Terrain.js";
import { Reactor } from "./worker/Reactor.js";
import { Rocket } from "./worker/Rocket.js";
import { Planet } from "./worker/Planet.js";
import { BlackHole } from "./worker/BlackHole";
import { Start } from "./worker/Start";
import { PhysicsComputer } from "./worker/physics/PhysicsComputer.js";

// Create an engine
// let engine = Matter.Engine.create();
// engine.world.gravity.y = 0;
// let time = 0;

let terrain = new Terrain();
// Define canvas

// let render = Render.create({element: document.body,engine: engine});
// render.options.wireframes = false;
// render.canvas.width = document.documentElement.clientWidth -100;
// render.canvas.height = document.documentElement.clientHeight -100;
let canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');
canvas.width = terrain.size.width;
canvas.height = terrain.size.height;
document.body.appendChild(canvas);
let starBackground = new Image();
starBackground.src = './assets/images/starBackground.png';
starBackground.loaded = false;
starBackground.onload = ()=>starBackground.loaded = true;

let rockets = [];
// Rocket parameters
for(let i=0;i<3;i++){
let r = new Rocket();
  r.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
  r.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
  r.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
  r.addReactor({x:Math.random()*20-10,y:Math.random()*20-10},0.0001*(Math.random()+1),50*(20*Math.random()),150*(Math.random()+1),Math.random()*3-1.5+Math.PI);
  rockets.push(r);
}
// let rocketBluePrint = [{ x: 0, y: 0 },{ x: 30, y: 0 },{ x: 30, y: 40 },{ x: 25, y: 50 },{ x: 15, y: 55 },{ x: 5, y: 50 },{ x: 0, y: 40 }];
let obstacles = [];
// obstacle creation

for(let i = 0; i<4; i++){
  let p = new Planet({x:Math.random()*canvas.width,y:Math.random()*canvas.height},40);
  obstacles.push(p);
}
let b = new BlackHole({x:Math.random()*canvas.width,y:Math.random()*canvas.height},20);
obstacles.push(b);
let st = new Start({x:canvas.width/2,y:canvas.height/2});
obstacles.push(st);

for(let o of obstacles)terrain.addObject(o);

let computer = new PhysicsComputer(terrain,rockets);


// let physicsObjects = objects.map(o=>o.createPhysicsObject());
// for(let r of physicsObjects.filter(o=>o instanceof PhysicsRocket)) r.setPosition({x:screenWidth/2,y:screenHeight*2/3});//rocket placement
// for(let o of physicsObjects){
//   Matter.World.add(engine.world, o.object);
// }



// check for collisions
// Matter.Events.on(engine, 'collisionActive', function(event) {
//   let i, currentPair, currentPart;
//   let n = event.pairs.length;
//
//   for(let i =0; i<n; i++){
//     currentPair = event.pairs[i];
//     for(let r of physicsObjects.filter(o=>o instanceof PhysicsRocket)){
//       let m = r.object.parts.length;
//       for(let j=0;j<m;j++){
//         currentPart = r.object.parts[j];
//         if( (currentPair.bodyA.label === currentPart.label) || (currentPair.bodyB.label === currentPart.label)){
//           //console.log("collision");
//         }
//       }
//     }
//
//   }
//
// });

// apply force
// Matter.Events.on(engine, "beforeUpdate",e=>{
//       time += 1;
//       for(let o of physicsObjects){
//         o.update(time,physicsObjects);
//       }
// });

// run the engine
//Matter.Engine.run(engine);

// old renderer run
// Render.run(render);

// New renderer
(function render() {

    //Loop
    window.requestAnimationFrame(render);
    // Matter.Engine.update(engine);
    computer.update();

    //Clear Scene
    if (starBackground.loaded){

      context.drawImage(starBackground,0,0,canvas.width,starBackground.height/starBackground.width*canvas.width);
    }
    else {
      context.fillStyle = '#1a233a';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    //Render Rocket
    for(let rocket of computer.rockets){
      context.save();
      context.translate(rocket.position.x,rocket.position.y);
      context.rotate(rocket.angle + Math.PI);
      rocket.draw(context);
      context.restore();
    }


    //Render Obstacles
    for(let o of obstacles){
      context.save();
      context.translate(o.position.x,o.position.y);
      o.draw(context);
      context.restore();
    }

})();
