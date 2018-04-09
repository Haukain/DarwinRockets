import { Button } from "../displayer/button/Button.js";
// Sérieux là ça se commit pas un truc comme ça
export class StartScreen{
	constructor(app){
		let that = this;
		this._app=app;
		this._EditButton = new Button;
		//back button
    	this._addButton("arrow_back","go back",e=>{that._app.goBack()});
    	//start/stop gen Button
    	this._addButton("play_arrow","toggle continuous generation",e=>{
      		if(e.icon=="play_arrow"){
        		e.icon = "pause";
      		}else{
        		e.icon = "play_arrow";
      		}
      	});

    	this._TutorialButtons = TutorialButtons;




}
