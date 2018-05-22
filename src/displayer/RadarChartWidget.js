import { ChartWidget } from "./ChartWidget.js";

export class RadarChartWidget extends ChartWidget{
  constructor(bg,fg,labels,ratio) {
    super(bg,fg,"radar",ratio);
    this._chart.data.labels=labels;
  }
}
