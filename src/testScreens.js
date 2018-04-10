import { Screen } from "./app/Screen.js";
import { App } from "./app/App.js";
import { GridScreen } from "./app/GridScreen.js";
import { Generation } from "./worker/Generation.js";

let app = new App(document.body);
let screen = new Screen(app);
screen.destroy();
console.log(screen.container);

let gen = new Generation();
gen.addRockets(1)
let gridscreen = new GridScreen(app,gen);