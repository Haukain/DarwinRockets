import { Screen } from "./Screen.js";
import { Col } from "../displayer/Col.js";
import { ChartWidget } from "../displayer/ChartWidget.js";
import { Row } from "../displayer/Row.js";
import { LineChartWidget } from "../displayer/LineChartWidget.js";
import { RadarChartWidget } from "../displayer/RadarChartWidget.js";
import { Generation } from "../worker/Generation.js";

export class ChartScreen extends Screen{
		constructor(app, gen) {
        super(app,"grey");
        this._gen = gen;

        //average score per generation chart
		let c1 = new Col(6,6,6,6);
		let c2 = new Col(6,6,6,6);
		this._container.addChild(c1);
		this._container.addChild(c2);
		let scoreChart = new LineChartWidget('white', 'grey');
		let datasetOne = scoreChart.addDataset("Score moyen par génération","#0011FC","#C2C6FA");
		for(let gen of this._app.generations){scoreChart.addDataPoint(datasetOne,gen.getAverage());}
		c1.addChild(scoreChart);

		//moyenne de toutes les gen n-1 et gen n (2 triangles )
		let radarChart = new RadarChartWidget('white', 'grey',["Distance","Speed","Complexity"]);
		radarChart.addDataset("Génération actuelle",randomColor(1),randomColor(.2),[Math.random(),Math.random(),Math.random()]);
		radarChart.addDataset("Génération parent",randomColor(1),randomColor(.2),[Math.random(),Math.random(),Math.random()]);
		c2.addChild(radarChart);
    }

}
function randomChar(){
  return Math.round(Math.random()*255);
}
function randomColor(a){
  return `rgba(${randomChar()},${randomChar()},${randomChar()},${a})`
}