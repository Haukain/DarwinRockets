import { WorkerCommander } from "./WorkerCommander.js";
import { Configuration } from "./Configuration.js";
import { Rocket } from "./Rocket.js";
import { Start } from "./Start.js";
import { End } from "./End.js";
import { PhysicsComputer } from "./physics/PhysicsComputer.js";
export class Evaluator{
  constructor(){
    let that = this;
    this._config = null;
    this._appcom = new WorkerCommander(self);
    this._appcom.addCommandListener("setWorker",s=>{
			s.start();
			that._com = new WorkerCommander(s);
      that._com.addCommandListener("setConfig",d=>{
        that._config = Configuration.fromStructure(d);
        that._startPos = that._config.terrain.objects.filter(o=>o instanceof Start)[0].position;0
    		that._targetPos = that._config.terrain.objects.filter(o=>o instanceof End)[0].position;
    		that._totalDist = Math.sqrt( Math.pow(that._targetPos.x -that._startPos.x,2) + Math.pow(that._targetPos.y -that._startPos.y,2) );
      });
      that._com.addCommandListener("evaluateGen",ar=>{
        ar = ar.map(r=>Rocket.fromStructure(r));
        for(let r of ar){
          let minDist = 9999999999;
          let topSpeed = 0; // TODO: code topSpeed
          let complexity = r.reactors.length;
          let usefulReactors = 0;
          let completionTime = 0;
          let traveledDistance = 0;
          let engine = new PhysicsComputer(that._config.terrain,[r]);
          let prevPos = {x:engine.rockets[0].position.x,y:engine.rockets[0].position.y};
          while(minDist>30 && !engine.isEnded()){
            engine.update();
            let distTarget=Math.sqrt( Math.pow(engine.rockets[0].position.x-that._targetPos.x,2) + Math.pow(engine.rockets[0].position.y-that._targetPos.y,2) );
            if(!isNaN(distTarget))minDist = Math.min(distTarget,minDist);
            let delta=Math.sqrt( Math.pow(engine.rockets[0].position.x-prevPos.x,2) + Math.pow(engine.rockets[0].position.y-prevPos.y,2) );
            if(!isNaN(delta) && delta != Infinity)traveledDistance+=delta;
            prevPos = {x:engine.rockets[0].position.x,y:engine.rockets[0].position.y};
          }
          completionTime = !isNaN(engine.time)?engine.time:engine.simDuration;
          for (let reac of r.reactors){
            if(reac.activationTime<completionTime){
              usefulReactors+=1;
            }
          }
          let distToTargetRatio = (1 - (minDist/that._totalDist)).toFixed(2); // 1 is close 0 is start
          let completionTimeRatio = (1 - (completionTime/engine.simDuration)).toFixed(2); // 1 is fast 0 is notCompleted
          let traveledDistRatio = (traveledDistance/that._totalDist).toFixed(2); // >1 is greater than objective dist <1 is lower than objective dist
          let complexityRatio = (usefulReactors/complexity).toFixed(2); // 1 when all the reactors are useful 0 when none
          //console.log("disToT :",distToTargetRatio,"compTime :",completionTimeRatio,"travelDist :",traveledDistRatio,"complex :",complexityRatio);
          r.score = that._config.fitnessFunction.compute(distToTargetRatio, completionTimeRatio, traveledDistRatio, complexityRatio); // Score calculation by fitnessFunction (0 is bad, 1 is great)
          //console.log("score :",r.score);
        }
        return Promise.resolve(ar.map(r=>r.toStructure()));
      });
    });
  }
}