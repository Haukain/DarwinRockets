import { Screen } from "./Screen.js";
import { Col } from "../displayer/Col.js";
import { Card } from "../displayer/Card.js";
import { Title } from "../displayer/Title.js";
import { RangeInput } from "../displayer/RangeInput.js";
import { Button } from "../displayer/Button.js";
import { TerrainConfigurator } from "../displayer/TerrainConfigurator.js";

export class EditScreen extends Screen{

	constructor(app) {
		super(app,"navyblue");
		//structure
		let leftCol=new Col(12,12,5,5);
		let rightCol=new Col(12,12,7,7);
		this._container.addChild(leftCol);
		this._container.addChild(rightCol);
		//config
		let confCard = new Card("navyblue","white");
		leftCol.addChild(confCard);
		let confCardTitle = new Title("Configuration");
		confCard.addChild(confCardTitle);
		let testRange = new RangeInput();
		testRange.min=-1;
		testRange.max=1;
		testRange.step=.01;
		testRange.text="test range";
		confCard.addChild(testRange);
		let confirmButton = new Button("Confirm","white");
		confirmButton.on("click",()=>{
			this._app.goSimulation();
		});
		confCard.addChild(confirmButton);
		//terrain
		this._terrainConf = new TerrainConfigurator();
		rightCol.addChild(this._terrainConf);
    }
}
