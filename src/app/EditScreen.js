import { Screen } from "./Screen.js";
import { Col } from "../displayer/Col.js";
import { CenteredRow } from "../displayer/CenteredRow.js";
import { Card } from "../displayer/Card.js";
import { Title } from "../displayer/Title.js";
import { RangeInput } from "../displayer/RangeInput.js";
import { TerrainConfigurator } from "../displayer/TerrainConfigurator.js";

export class EditScreen extends Screen{

	constructor(app) {
		super(app);
		//structure
		let leftCol=new Col(12,12,6,6);
		let rightCol=new Col(12,12,6,6);
		this._container.addChild(leftCol);
		this._container.addChild(rightCol);
		//config
		let crl = new CenteredRow();
		leftCol.addChild(crl);
		let confCard = new Card("white","navyblue");
		crl.addChild(confCard);
		let confCardTitle = new Title("Configuration");
		confCard.addChild(confCardTitle);
		let testRange = new RangeInput();
		confCard.addChild(testRange);
		//terrain
		this._terrainConf = new TerrainConfigurator();
		rightCol.addChild(this._terrainConf);
    }
}
