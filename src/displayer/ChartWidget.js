import { CanvasWidget } from "./CanvasWidget.js";

export class ChartWidget extends CanvasWidget{
  constructor(bg,fg,type,ratio=(16/8)) {
    super(bg,fg);
    this._canvas.width = 1600;
    this._canvas.height = Math.round(this._canvas.width / ratio);
    this._chart = new Chart(this._ctx, {type:type,data:{},options:{maintainAspectRatio:true}});
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
