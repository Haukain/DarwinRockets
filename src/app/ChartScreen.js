import { Screen } from "./Screen.js";
import { Col } from "../displayer/Col.js";
import { ChartWidget } from "../displayer/ChartWidget.js";
import { Row } from "../displayer/Row.js";
import { LineChartWidget } from "../displayer/LineChartWidget.js";
import { RadarChartWidget } from "../displayer/RadarChartWidget.js";

export class ChartScreen extends Screen{
		constructor(app, gen) {
        super(app,"grey");
        this._gen = gen;

		let c1 = new Col(6,6,6,6);
		let c2 = new Col(6,6,6,6);
		this._container.addChild(c1);
		this._container.addChild(c2);
		let myChart = new LineChartWidget('white', 'grey');
		let datasetOne = myChart.addDataset("one",randomColor(1),randomColor(.2));
		myChart.addDataPoint(datasetOne,227);
		myChart.addDataPoint(datasetOne,331);
		myChart.addDataPoint(datasetOne,50);
		c1.addChild(myChart);
		let myChart2 = new RadarChartWidget('white', 'grey',["dsitance","speed","complexity"]);
		for(let i=0;i<5;i++)myChart2.addDataset(randomChar(),randomColor(1),randomColor(.2),[Math.random(),Math.random(),Math.random()]);
		c2.addChild(myChart2);
    }

}
function randomChar(){
  return Math.round(Math.random()*255);
}
function randomColor(a){
  return `rgba(${randomChar()},${randomChar()},${randomChar()},${a})`
}