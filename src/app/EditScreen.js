import { Screen } from "./Screen.js";
import { Col } from "../displayer/Col.js";
import { Row } from "../displayer/Row.js";
import { Card } from "../displayer/Card.js";
import { Title } from "../displayer/Title.js";
import { RangeInput } from "../displayer/RangeInput.js";
import { Button } from "../displayer/Button.js";
import { Toolbar } from "../displayer/Toolbar.js";
import { Alert } from "../dialogs/Alert.js";
//terrain configurator
import { TerrainConfigurator } from "../displayer/TerrainConfigurator/TerrainConfigurator.js";
import { MoveTerrainTool } from "../displayer/TerrainConfigurator/MoveTerrainTool.js";
import { EraseTerrainTool } from "../displayer/TerrainConfigurator/EraseTerrainTool.js";
import { PlaceTerrainTool } from "../displayer/TerrainConfigurator/PlaceTerrainTool.js";
//terrain objects
import { Start } from "../worker/Start.js";
import { End } from "../worker/End.js";
import { Planet } from "../worker/Planet.js";

export class EditScreen extends Screen{

	constructor(app) {
		super(app,"navyblue");
		//structure
		let leftCol=new Col(12,12,5,5);
		let rightCol=new Col(12,12,7,7);
		this._container.addChild(leftCol);
		this._container.addChild(rightCol);
		//config
		let map =[
			{
				title:"Population size",
				params:[
					{key:".populationSize",name:"",min:"10",max:"100",step:"1"}
				]
			},
			{
				title:"Score calculation",
				params:[
					{key:".fitnessFunction.remainingDistanceFactor",name:"distance to objective",min:"-1",max:"1",step:".01"},
					{key:".fitnessFunction.completionTimeFactor",name:"time of flight",min:"-1",max:"1",step:".01"},
					{key:".fitnessFunction.traveledDistanceFactor",name:"distance traveled",min:"-1",max:"1",step:".01"},
					{key:".fitnessFunction.complexityFactor",name:"rocket complexity",min:"-1",max:"1",step:".01"}
				]
			},
			{
				title:"Reproduction",
				params:[
					{key:".fitnessFunction.newGeneAppearanceRate",name:"gene appearance rate",min:"0",max:"1",step:".01"},
					{key:".fitnessFunction.geneDistributionDeviationFactor",name:"distribution random",min:"0",max:"1",step:".01"},
					{key:".fitnessFunction.randomMutationRate",name:"mutation rate",min:"0",max:"1",step:".01"}
				]
			}
		];
		let card = new Card("navyblue","white");
		leftCol.addChild(card);
		for(let section of map){
			let title = new Title(section.title);
			card.addChild(title);
			for(let param of section.params){
				let range = new RangeInput();
				range.min=param.min;
				range.max=param.max;
				range.step=param.step;
				range.text=param.name;
				range.value=eval("this._app.configuration"+param.key); // TODO: trouver une solution pour éviter cette vulnérabilité
				range.on("change",e=>{
					eval(`this._app.configuration${param.key}=${range.value}`); // TODO: trouver une solution pour éviter cette vulnérabilité
				});
				card.addChild(range);
			}
		}
		let LaunchButton = new Button("Launch Simulation","white");
		LaunchButton.on("click",()=>{
			let terrain = this._terrainConf.toTerrain();
			if(!terrain.isValid()){
				new Alert("Your terrain is invalid","Please make sure you have one start and one end.");
				return;
			}
			this._app.initTrainer();
			this._app.goSimulation();
		});
		card.addChild(LaunchButton);
		//terrain
		let rightColRow = new Row();
		rightCol.addChild(rightColRow);
		let terrainConfCol = new Col(11,11,11,11);
		let toolbarCol = new Col(1,1,1,1);
		rightColRow.addChild(terrainConfCol);
		rightColRow.addChild(toolbarCol);
		this._terrainConf = new TerrainConfigurator();
		terrainConfCol.addChild(this._terrainConf);
		this._toolbar = new Toolbar();
		toolbarCol.addChild(this._toolbar);
		const tools = [
			new MoveTerrainTool(this._terrainConf),
			new EraseTerrainTool(this._terrainConf),
			new PlaceTerrainTool(this._terrainConf,"play_arrow","start",Start),
			new PlaceTerrainTool(this._terrainConf,"stop","stop",End),
			new PlaceTerrainTool(this._terrainConf,"public","planet",Planet),
		];
		for(let tool of tools){
			this._toolbar.addChild(tool.button);
		}
	}
}
