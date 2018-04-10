import { Button } from "../displayer/button/Button.js";


export class StartScreen{
	constructor(app){
		let that = this;
		this._app=app;
		this._EditButton = new Button (" edit custom configuration ", "navyblue");

		this._TutorialButtons = new Button(" tutorial Button", "skyblue");
		}




}
