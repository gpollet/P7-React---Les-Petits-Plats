import { recipes } from "./api/recipes.js";
import { Recipe } from "./models/Recipe.js";
import { displayHome } from "./pages/index.js";

function init() {
  const recipesData = recipes
  displayHome(recipesData)
}

init()