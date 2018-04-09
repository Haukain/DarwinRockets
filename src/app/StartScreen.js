import { Button } from "../displayer/Button/Button.js";

export class StartScreen{
	constructor(app){
		let that = this;
		this._app=app;
		this._EditButton = new Button
		//back button
    	this._addButton("arrow_back","go back",e=>{that._app.goBack()});
    	//start/stop gen Button
    	this._addButton("play_arrow","toggle continuous generation",e=>{
      		if(e.icon=="play_arrow"){
        		e.icon = "pause";
        		that._app.startGen();
      		}else{
        		e.icon = "play_arrow";
        		that._app.stopGen();
      		}




}