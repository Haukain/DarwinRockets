import { Screen } from "./Screen.js";
import { Button } from "../displayer/Button.js";
import { Modal } from "../displayer/Modal.js";
import { Title } from "../displayer/Title.js";
import { Row } from "../displayer/Row.js";
import { CenteredRow } from "../displayer/CenteredRow.js";
import { Col } from "../displayer/Col.js";
import { ImageWidget } from "../displayer/ImageWidget.js";
import { ParallaxSVG } from "../displayer/ParallaxSVG.js";


export class StartScreen extends Screen{
	constructor(app){
		super(app,"navyblue");
		let that = this;
		//background parallax
		this._background = new ParallaxSVG("./assets/svg/background.svg",100);
		this._container.addChild(this._background);
		//centered row
		this._centerer = new CenteredRow();
		this._container.addChild(this._centerer);
		//logo
		this._logoCol = new Col(12,12,12,12);
		this._logo = new ImageWidget("./assets/images/logo.png");
		this._logoCol.addChild(this._logo);
		this._centerer.addChild(this._logoCol);
		//modal button
		this._tutsCol = new Col(12,12,12,12);
		this._tutsButton = new Button("Guided play", "pink");
		this._tutsCol.addChild(this._tutsButton);
		this._centerer.addChild(this._tutsCol);
		this._tutsButton.on("click",()=>{
			that._modal.show();
		});

		//freeplay button
		this._editCol = new Col(12,12,12,12);
		this._editButton = new Button ("Free play", "white");
		this._editCol.addChild(this._editButton);
		this._centerer.addChild(this._editCol);
		this._editButton.on("click",()=>{
			that._app.goEdit();
		});
		//modal
		this._modal = new Modal();
		this._container.addChild(this._modal);
		let title = new Title("Select a Guided play");
		this._modal.addChild(title);
		this._modalRow = new Row();
		this._modal.addChild(this._modalRow);
		fetch("./assets/json/tutorials.json").then(d=>d.json())
		.then(d=>{
			for(let id of Object.keys(d)) that._makeTutsButton(d[id].name,d[id]);
		});
	}
	_makeTutsButton(text,tut){
		let that = this;
		let col = new Col(12,6,6,6);
		let button = new Button(text, "pink");
		button.on("click",()=>{
			that._modal.hide();
			that._app.selectTutorial(tut);
		});
		col.addChild(button);
		this._modalRow.addChild(col);
	}
}
