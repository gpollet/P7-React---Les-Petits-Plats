import { recipes } from "./api/recipes.js";
import { displayHome } from "./pages/index.js";

function init() {
  displayHome(recipes)
}

init()