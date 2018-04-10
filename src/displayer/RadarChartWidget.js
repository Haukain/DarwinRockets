import { ChartWidget } from "./ChartWidget.js";

export class RadarChartWidget extends ChartWidget{
  constructor(bg,fg,labels) {
    super(bg,fg,"radar");
    this._chart.data.labels=labels;
  }
}
