import { WorkerCommander } from "./worker/WorkerCommander.js"
import Worker from 'worker-loader!./worker/Worker.js';
let worker = new Worker();
let com = new WorkerCommander(worker);
setTimeout(()=>{
  com.send("startGen");
  com.send("stopGen");
  com.send("nGen",15);
  com.send("isRunning",null,true).then(d=>console.log(d));
},20);