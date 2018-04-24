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

		let c1 = new Col(6,6,6,6);
		let c2 = new Col(6,6,6,6);
		let c3 = new Col(6,6,6,6);
		this._container.addChild(c1);
		this._container.addChild(c2);
		this._container.addChild(c3);

		//average score per generation chart (code pas fini)
		let scoreChart1 = new LineChartWidget('white', 'grey');
		let dataset1 = scoreChart1.addDataset("Average score per generation","#0011FC","#C2C6FA");
		let n = 0;

		for(let gen of this._app.generations){
			if(gen == this._app.currentGeneration){break;}
			if(n>150){if(n%10==0){scoreChart1.addDataPoint(dataset1,[{x : 100, y : gen.getAverage()}]);}}
			else{scoreChart1.addDataPoint(dataset1,gen.getAverage());}
			n++;
		}
		c1.addChild(scoreChart1);

		//reste a coder le radarchart : parametres distance, speed et complexity
		let radarChart = new RadarChartWidget('white', 'grey',["Distance","Speed","Complexity"]);
		radarChart.addDataset("Actual generation",randomColor(1),randomColor(.2),[Math.random(),Math.random(),Math.random()]);
		radarChart.addDataset("Parent generation",randomColor(1),randomColor(.2),[Math.random(),Math.random(),Math.random()]);
		c2.addChild(radarChart);

		//score of the actual generation chart (code pas fini)
		let scoreChart2 = new LineChartWidget('white', 'grey');
		let dataset2 = scoreChart2.addDataset("Number of rockets the actual generation per score","#0011FC","#C2C6FA");
		let max=this._app.currentGeneration.getMax();
		let min=this._app.currentGeneration.getMin();
		console.log(min);
		console.log(max);
		min=-10;
		max=10;
		let interval = (max-min)/10;
		for(let i=min; i<max; i+=interval){
			scoreChart2.addDataPoint(dataset2,this._app.currentGeneration.getInterval(i,i+interval));console.log(this._app.currentGeneration.getInterval(i,i+interval));}
		c3.addChild(scoreChart2);
    }

}
function randomChar(){
  return Math.round(Math.random()*255);
}
function randomColor(a){
  return `rgba(${randomChar()},${randomChar()},${randomChar()},${a})`
}