import { Screen } from "./Screen.js";
import { TerrainConfigurator } from "../displayer/TerrainConfigurator.js";

export class ConfigurationScreen extends Screen{

	constructor(visibility) {
		super(visibility);
		this.config = new TerrainConfigurator();
    }
}
