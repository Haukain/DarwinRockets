import { ScreenContainer } from "../displayer/ScreenContainer.js";

export class Screen{

	constructor(app,bg,fg) {
    	this._container = new ScreenContainer(bg);
    	this._app = app;
    }

    destroy(){
      this._app.container.removeChild(this._container);
      this._container.destroy();
    	delete this._container;
			delete this._app;
    	
    }

    get container(){return this._container;}

}
