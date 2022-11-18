export function createRecipeCard(container, recipe, mediaFilename) {
  const clockIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg>'
  
  container.innerHTML += `<img src="../assets/pictures/${mediaFilename}.jpg" class="recipe-card_picture" alt="${recipe.name}"></img>
  <figure class="recipe-card_title">
  <h2>${recipe.name}</h2><span> ${clockIcon + recipe.time} min</span>
  </figure>
  <div class="recipe-card_bottom">
  <ul class="recipe-card_ingredients-list" data-recipe-id="${recipe.id}"></ul>
  <p class="recipe-card_description">${recipe.description}</p>
  </div>`
}

export function createIngredientsList(recipeId, ingredientData) {
  const ingredientsContainer = document.querySelector(
    `[data-recipe-id="${recipeId}"].recipe-card_ingredients-list`
  )
  if (ingredientData.unit == "grammes") {
    ingredientData.unit = "g"
  }
  if (
    ingredientData.unit == "cuillères à soupe" &&
    ingredientData.quantity == 1
  ) {
    ingredientData.unit = "cuillère à soupe"
  }
  ingredientsContainer.innerHTML += `<li><span class="recipe-card_ingredients-list_ingredient-name">${ingredientData.ingredient}${
    ingredientData.quantity ? ":</span> " + ingredientData.quantity : "</span>"
  } ${ingredientData.unit ? ingredientData.unit : ""}</li>`
}
