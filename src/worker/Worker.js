import { WorkerCommander } from "./WorkerCommander.js"

let com = new WorkerCommander(self);
com.addCommandListener("startGen",d=>{console.log("startGen")});
com.addCommandListener("stopGen",d=>{console.log("stopGen")});
com.addCommandListener("nGen",d=>{console.log(`${d}gen`)});
com.addCommandListener("isRunning",d=>Promise.resolve(true));
