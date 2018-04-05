import { Screen } from "./screen.js";
import { TerrainConfigurator } from "../displayer/terrainconfigurator.js";

export class ConfigurationScreen extends Screen{

	constructor(visibility) {
		super(visibility);
		this.config = new TerrainConfigurator();
    }
}