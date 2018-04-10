import { CanvasWidget } from "./CanvasWidget.js";

export class ChartWidget extends CanvasWidget{
  constructor(bg,fg,type) {
    super(bg,fg);
    this._chart = new Chart(this._ctx, {type:type,data:{}});
    console.log(this._chart);
  }
  addDataset(label,borderColor,backgroundColor,data){
    data=data||[];
    this._chart.data.datasets.push({
      label:label,
      borderColor:borderColor,
      backgroundColor:backgroundColor,
      data:data
    });
    return this._chart.data.datasets.length-1;
  }
}
