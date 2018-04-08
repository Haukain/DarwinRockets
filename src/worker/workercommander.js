class WorkerCommander{
  constructor(context){
    let that = this;
    this._context=context;
    this._context.onmessage = e=>{
      that._interpret(e.data)
    };
    this._receivers={};
    this._returnPromises={};
  }
  _interpret(c){
    if(!(c.type && c.command && c.id && c.data)) return;
    if(c.type==0){
      if(c.command in this._receivers){
        let r = this._receivers[c.command](c.data);
        if(r && r.then)r.then(d=>{
          this._sendCom(1,c.command,c.id,d);
        });
      }else{console.log(`missing command ${c.command}`)}
    }else if(c.type==1){
      if(c.id in this._returnPromises){
        this._returnPromises[c.id].res(c.data);
        delete this._returnPromises[c.id];
      }
    }
  }
  _sendCom(t,c,i,d){
    this._context.postMessage({type:t,command:c,id:i,data:d});
  }
  send(command,data,isReturn){//(string,object,bool)
    let id = Math.random();
    this._sendCom(0,command,Math.random(),data);
    if(isReturn){
      return new Promise((res,rej)=>{this._returnPromises[id]={res:res,rej:rej};});
    }
  }
  addCommandListener(command,listener){
    this._receivers[command]=listener;
  }
}
