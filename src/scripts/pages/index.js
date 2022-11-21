import { createHeader } from "../components/header.js"
import { createSearchBar } from "../components/search-bar.js"
import {
  createRecipeFilters,
  createTopFiltersSuggestions,
  trackTopFilterChevronDirection,
} from "../components/top-filters.js"
import { Recipe } from "../models/Recipe.js"
import { dataset } from "../store/store.js"

export function displayHome(data) {
  const app = document.getElementById("app")
  const main = document.createElement("main")
  createHeader(app)
  app.appendChild(main)
  createSearchBar(main)
  createRecipeFilters(main)
  const recipeListContainer = document.createElement("div")
  recipeListContainer.classList = "recipes-list_container"
  main.appendChild(recipeListContainer)
  const recipeCards = data.map((recipe) => {
    new Recipe(recipe).displayRecipeCard(recipeListContainer)
  })
  createStoreDataset(data)
  console.log(dataset)
  sortStoreDataset()
  createTopFiltersSuggestions()
  cropDescriptions()
  lastRowRecipeList(recipeCards, recipeListContainer)
  trackTopFilterChevronDirection()
}

// Creates an empty and hidden recipe card on the last row of the recipe list when it would display 2 cards, to prevent "justify-content: space between" to add a gap in-between the two recipes.
function lastRowRecipeList(recipeCards, container) {
  if (recipeCards.length % 3 === 2) {
    const hiddenRecipePlaceholder = document.createElement("div")
    hiddenRecipePlaceholder.classList = "recipe-card_container recipe-card_placeholder"
    container.appendChild(hiddenRecipePlaceholder)
  }
}

// Crops descriptions longer than 170 characters, and adds "..." at the end of the description instead
function cropDescriptions() {
  const description = document.querySelectorAll(".recipe-card_description")
  for (let desc of description) {
    if (desc.textContent.length > 170) {
      desc.textContent = `${desc.textContent.slice(0, 170)}...`
    }
  }
}

// Creates a list of all possible ingredients, appliances and ustensils based on the recipes data
function createStoreDataset(recipes) {
  recipes.map((recipes) => {
    for (let recipe of [recipes]) {
      loopThroughArray(recipe)
    }
  })

  function loopThroughArray(data) {
    for (let entry of [data]) {
      Object.entries(entry).forEach(([key, value]) => {
        if (dataset[key] !== undefined)
          if (
            typeof value == "string" &&
            !Object.values(dataset[key]).includes(value) &&
            !dataset[key].includes(value.slice(0, value.length - 1))
          ) {
            dataset[key].push(value)
          }
        if (typeof value == "object") {
          if (value.length) {
            for (let array of value) {
              loopThroughArray({ [key]: array })
            }
          }
          loopThroughArray(value)
        }
      })
    }
  }
    //console.log(data)
    //return
    //Object.entries(data).map(([key, value]) => {
    //  if (typeof value == "string" && !Object.keys(dataset).includes(value)) {
    //    dataset[key].push(value)
    //    delete data[key]
    //  } else if (typeof value == "object") {
    //    if (value.length == 1) {
    //      dataset[key].push(value.toString())
    //      delete data[key]
    //      //console.log(data)
    //    }
    //    //let oldData = data
    //    //loopThroughArray(oldData)
    //    //console.log(Object.entries(value))
    //    //return loopThroughArray(data)
    //  }
    //})
  //console.log(recipes[1])
  //for (let recipe of recipes) {
  //  loopThroughArray(recipe)
  //    }
  //console.log(recipes)
  //loopThroughArray(recipes)
  //return
  //for (let [key, value] of Object.entries(recipe)) {
  //  //if (Object.keys(dataset).includes(key) && !dataset[key].includes(value)) {
  //  //if (typeof value == "string") dataset[key].push(value)
  //  if (typeof value == "object") {
  //    let currentCategory = key
  //    let oldValue = Object.entries(value)
  //    let test = value.map((entries) => {
  //      Object.entries(entries).forEach(([key, value]) => {
  //        //console.log(Object.keys(dataset).includes(key))
  //        //console.log(key)
  //      })
  //    })
  //    for (let [key, value] of oldValue) {
  //      //console.log(key, value)
  //      if (value.ingredient) {
  //        value = value.ingredient
  //      }
  //      // Checks if ingredient already exists even if it was written in singular/plural to avoid duplicates
  //      if (
  //        typeof value == "string" &&
  //        !dataset[currentCategory].includes(value) &&
  //        !dataset.ingredients.includes(value.slice(0, value.length - 1))
  //      ) {
  //        //dataset[currentCategory].push(value)
  //      }
  //    }
  //    //}
  //  }
  //}

  //recipe.ingredients.map((ingredient) => {
  //  if (
  //    !dataset.ingredients.includes(ingredient.ingredient) &&
  //    // Checks if ingredient already exists even if it was written in singular/plural to avoid duplicates
  //    !dataset.ingredients.includes(
  //      ingredient.ingredient.slice(0, ingredient.ingredient.length - 1)
  //    )
  //  )
  //    dataset.ingredients.push(ingredient.ingredient)
  //})
  //if (!dataset.appliances.includes(recipe.appliance)) {
  //  dataset.appliances.push(recipe.appliance)
  //}
  //recipe.ustensils.map((ustensil) => {
  //  if (!dataset.ustensils.includes(ustensil)) dataset.ustensils.push(ustensil)
  //})
}

const sortStoreDataset = () => {
  for (let [key, value] of Object.entries(dataset)) {
    value.sort()
  }
}
