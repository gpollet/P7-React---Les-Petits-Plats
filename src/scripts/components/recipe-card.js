export function createRecipeCard(container, recipe) {
  container.innerHTML += `<img src="" class="recipe-card_picture" alt="${recipe.name}"></img>
  <figure class="recipe-card_title">
  <h2>${recipe.name}</h2><span>${recipe.time} min</span>
  </figure>
  <div class="recipe-card_bottom">
  <ul class="recipe-card_ingredients-list" data-recipe-id="${recipe.id}"></ul>
  <p>${recipe.description}</p>
  </div>`
}

export function createIngredientsList (recipeId, ingredients) {
  const ingredientsContainer = document.querySelector(`[data-recipe-id="${recipeId}"]`)
  //console.log(ingredients)
  for (let ingredient of ingredients) {
    ingredientsContainer.innerHTML += `<li>${ingredient.ingredient}: ${ingredient.quantity? ingredient.quantity: ""} ${ingredient.unit? ingredient.unit : ""}</li>`
  }
}