import { ChartWidget } from "./ChartWidget.js";

export class BarChartWidget extends ChartWidget{
  constructor(bg,fg,ratio) {
    super(bg,fg,"bar",ratio);
  }
  addDataPoint(dataset,label,data){
    if(this._chart.data.datasets[dataset].data.length>=this._chart.data.labels.length) this._chart.data.labels.push(label);
    this._chart.data.datasets[dataset].data.push(data);
    this._chart.update();
  }
}
