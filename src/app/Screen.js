import { Row } from "../displayer/Row.js";

export class Screen{

	constructor(app) {
    	this._container = new Row();
    	this._app = app;
    }

    destroy(){
        this._app.container.removeChild(this._container);
        this._container.destroy();
    	delete this._container;
    	console.log("destroyed");
    }

    get container(){return this._container;}

}
