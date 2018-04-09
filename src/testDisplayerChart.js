import { Widget } from "./displayer/Widget.js";
import { Row } from "./displayer/Row.js";
import { Col } from "./displayer/Col.js";
import { Button } from "./displayer/Button.js";
import { IconButton } from "./displayer/IconButton.js";
import { Card } from "./displayer/Card.js";
import { Text } from "./displayer/Text.js";
import { Title } from "./displayer/Title.js";
import { Input } from "./displayer/Input.js";
import { RangeInput } from "./displayer/RangeInput.js";
import { NumericInput } from "./displayer/NumericInput.js";
import { CanvasWidget } from "./displayer/CanvasWidget.js";
import { LineChartWidget } from "./displayer/LineChartWidget.js";
import { RadarChartWidget } from "./displayer/RadarChartWidget.js";

function randomChar(){
  return Math.round(Math.random()*255);
}
function randomColor(a){
  return `rgba(${randomChar()},${randomChar()},${randomChar()},${a})`
}

let r = new Row();
document.body.appendChild(r.element);
let c1 = new Col(6,6,6,6);
let c2 = new Col(6,6,6,6);
r.addChild(c1);
r.addChild(c2);
let myChart = new LineChartWidget('white', 'grey');
let datasetOne = myChart.addDataset("one",randomColor(1),randomColor(.2));
myChart.addDataPoint(datasetOne,227);
myChart.addDataPoint(datasetOne,331);
myChart.addDataPoint(datasetOne,11);
myChart.addDataPoint(datasetOne,50);
c1.addChild(myChart);
let myChart2 = new RadarChartWidget('white', 'grey',["dsitance","speed","complexity"]);
for(let i=0;i<5;i++)myChart2.addDataset(randomChar(),randomColor(1),randomColor(.2),[Math.random(),Math.random(),Math.random()]);
c2.addChild(myChart2);