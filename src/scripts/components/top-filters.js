import { chevronDownIcon, chevronUpIcon, dataset } from "../store/store.js"

export const createRecipeFilters = (container) => {
  container.innerHTML += `<div class="top-filters-list_container">
<div class="top-filters_container">
<label>
<input class="top-filters_ingredients" name="ingredients" placeholder="Ingrédients" aria-label="Rechercher par ingrédients"></input>${chevronDownIcon}
</label>
<div class="top-filters_suggestions-container" data-filter-visibility="hidden" data-filter-category="ingredients">
<ul class="top-filters_suggestions-list"></ul>
</div></div>

<div class="top-filters_container">
<label>
<input class="top-filters_appareils" name="appliances" placeholder="Appareils" aria-label="Rechercher par appareils"></input>${chevronDownIcon}
</label>
<div class="top-filters_suggestions-container" data-filter-visibility="hidden" data-filter-category="appliances">
<ul class="top-filters_suggestions-list"></ul>
</div></div>

<div class="top-filters_container">
<label>
<input class="top-filters_ustensiles" name="ustensils" placeholder="Ustensiles" aria-label="Rechercher par ustensiles"></input>
${chevronDownIcon}
</label>
<div class="top-filters_suggestions-container" data-filter-visibility="hidden" data-filter-category="ustensils">
<ul class="top-filters_suggestions-list"></ul>
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
  const topFilters = document.querySelectorAll(".top-filters_suggestions-list")
  for (let topFilter of topFilters) {
    for (let [key, value] of Object.entries(dataset)) {
      if (topFilter.parentNode.dataset.filterCategory == key) {
        value.map((el) => {
          const suggestionListItem = document.createElement("li")
          suggestionListItem.textContent += el
          topFilter.appendChild(suggestionListItem)
        })
      }
    }
    topFilter.addEventListener("focusin", (event) => {
      const filterSuggestionsContainer = event.target.parentNode.nextElementSibling
      filterSuggestionsContainer.setAttribute("data-filter-visibility", "visible")
    })
    topFilter.addEventListener("focusout", (event) => {
      const filterSuggestionsContainer = event.target.parentNode.nextElementSibling
      filterSuggestionsContainer.setAttribute("data-filter-visibility", "hidden")
    })
  }
}
