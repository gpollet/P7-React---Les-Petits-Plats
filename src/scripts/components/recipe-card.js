export function createRecipeCard(container, recipe, mediaFilename) {
  container.innerHTML += `<img src="/assets/pictures/${mediaFilename}.jpg" class="recipe-card_picture" alt="${recipe.name}"></img>
  <figure class="recipe-card_title">
  <h2>${recipe.name}</h2><span>${recipe.time} min</span>
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
  ingredientsContainer.innerHTML += `<li>${ingredientData.ingredient}${
    ingredientData.quantity ? ": " + ingredientData.quantity : ""
  } ${ingredientData.unit ? ingredientData.unit : ""}</li>`
}
