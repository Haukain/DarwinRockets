let worker = new Worker("./worker.js", {type:"module"})
let com = new WorkerCommander(worker);
com.send("startGen");
com.send("stopGen");
com.send("nGen",15);
com.send("isRunning",null,true).then(d=>console.log(d));