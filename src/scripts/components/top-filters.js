import { chevronDownIcon, chevronUpIcon, dataset } from "../store/store.js"

export const createRecipeFilters = (container) => {
  container.innerHTML += `<div class="top-filters-list_container">
<div class="top-filters_container">
<label>
<input class="top-filters_ingredient" name="ingredient" placeholder="Ingrédients" aria-label="Rechercher par ingrédients"></input>${chevronDownIcon}
</label>
<div class="top-filters_suggestions-container" data-filter-visibility="hidden" data-filter-category="ingredient">
<ul class="top-filters_suggestions-list" data-filter-list-category="ingredient"></ul>
</div></div>

<div class="top-filters_container">
<label>
<input class="top-filters_appareils" name="appliance" placeholder="Appareils" aria-label="Rechercher par appareils"></input>${chevronDownIcon}
</label>
<div class="top-filters_suggestions-container" data-filter-visibility="hidden" data-filter-category="appliance">
<ul class="top-filters_suggestions-list" data-filter-list-category="appliance"></ul>
</div></div>

<div class="top-filters_container">
<label>
<input class="top-filters_ustensiles" name="ustensils" placeholder="Ustensiles" aria-label="Rechercher par ustensiles"></input>
${chevronDownIcon}
</label>
<div class="top-filters_suggestions-container" data-filter-visibility="hidden" data-filter-category="ustensils">
<ul class="top-filters_suggestions-list" data-filter-list-category="ustensils"></ul>
</div></div>
</div>`
}

// Change the top-filters chevron icon direction on focus in/out
export const trackTopFilterChevronDirection = () => {
  const chevronContainer = document.querySelectorAll(".top-filters_container label")
  for (let label of chevronContainer) {
    const inputField = label.firstElementChild
    inputField.addEventListener(
      "focusin",
      () => (inputField.nextElementSibling.outerHTML = chevronUpIcon)
    )
    inputField.addEventListener(
      "focusout",
      () => (inputField.nextElementSibling.outerHTML = chevronDownIcon)
    )
  }
}

export const createTopFiltersSuggestions = () => {
  const topFilters = document.querySelectorAll(".top-filters_container")
  //let test = document.querySelector(".top-filters_ingredients").addEventListener("click", () => {console.log("test")})
  for (let topFilter of topFilters) {
    // For each top filter category, retrieves the category name and populates the top filter with the corresponding entries from the Store
    for (let [key, value] of Object.entries(dataset)) {
      const topFilterList = document.querySelector(
        `[data-filter-list-category=${key}].top-filters_suggestions-list`
      )
      value.map((el) => {
        const suggestionListItem = document.createElement("li")
        suggestionListItem.textContent += el
        topFilterList.appendChild(suggestionListItem)
      })
    }
    let filterSuggestionsContainer
    topFilter.addEventListener("focusin", (event) => {
      filterSuggestionsContainer = document.querySelector(
        `[data-filter-category=${event.target.name}].top-filters_suggestions-container`
      )
      filterSuggestionsContainer.setAttribute("data-filter-visibility", "visible")
    })
    topFilter.addEventListener("focusout", (event) => {
      filterSuggestionsContainer.setAttribute("data-filter-visibility", "hidden")
    })
  }
}
