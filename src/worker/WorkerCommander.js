export class WorkerCommander{
  constructor(context){
    let that = this;
    this._context=context;
    this._context.onmessage = e=>{
      that._interpret(e.data);
    };
    this._receivers={};
    this._returnPromises={};
  }
  _interpret(c){
    if(!(typeof c.type != "undefined" && typeof c.command != "undefined" && typeof c.id != "undefined")) return;
    if(c.type==0){
      if(Object.keys(this._receivers).indexOf(c.command)!=-1){
        let r = this._receivers[c.command](c.data);
        if(r && r.then)r.then(d=>{
          this._sendCom(1,c.command,c.id,d);
        });
      }else{console.log(`missing command ${c.command}`)}
    }else if(c.type==1){
      if(Object.keys(this._returnPromises).indexOf(c.id)!=-1){
        this._returnPromises[c.id].res(c.data);
        delete this._returnPromises[c.id];
      }
    }
  }
  _sendCom(t,c,i,d){
    this._context.postMessage({type:t,command:c,id:i,data:d});
  }
  send(command,data,isReturn){//(string,object,bool)
    let id = ""+Math.round(Math.random()*1000000);
    this._sendCom(0,command,id,data);
    if(isReturn){
      return new Promise((res,rej)=>{this._returnPromises[id]={res:res,rej:rej};});
    }
  }
  addCommandListener(command,listener){
    this._receivers[command]=listener;
  }
}
