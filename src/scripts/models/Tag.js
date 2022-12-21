import { store } from "../store/store.js"
import { Search } from "../utils/Search.js"
import { closeIcon, Utils } from "../utils/Utils.js"

export class Tag {
  constructor(category, item, suggestedElement) {
    this.category = category
    this.item = item
    this.suggestedElement = suggestedElement
  }

  static createActiveFiltersContainer(parent) {
    const activeFiltersContainer = document.createElement("div")
    activeFiltersContainer.className = "active-filters_container"
    parent.appendChild(activeFiltersContainer)
  }

  // Adds selected item to active filter if it is not already active
  addActiveFilter() {
    let activeFilterCategoryContainer
    const newActiveFilterButton = document.createElement("div")
    newActiveFilterButton.className = `active-filters_item ${this.category}`
    newActiveFilterButton.textContent = `${this.item}`
    newActiveFilterButton.value = `${this.item}`
    newActiveFilterButton.innerHTML += `${closeIcon}`
    // Checks if there are no active filters of the same category as the filter being added
    if (!document.querySelector(`.active-filters_item.${this.category}`)) {
      activeFilterCategoryContainer = document.querySelector(`.active-filters_container`)
      activeFilterCategoryContainer.appendChild(newActiveFilterButton)
    } else {
      // If there are already active filters of that category, regroup them together
      activeFilterCategoryContainer = document.querySelectorAll(
        `.active-filters_item.${this.category}`
      )
      activeFilterCategoryContainer[activeFilterCategoryContainer.length - 1].insertAdjacentElement(
        "afterend",
        newActiveFilterButton
      )
    }
    this.removeActiveFilterEvent(newActiveFilterButton)
  }

  // Removes active filter from the store and the DOM when clicking on its "X" icon
  removeActiveFilterEvent(activeFilterButton) {
    activeFilterButton.addEventListener("click", (event) => {
      if (event.target.classList.value == "active-filter-close_button") {
        store.userSelectedFilters[this.category] = store.userSelectedFilters[this.category].filter(
          (el) => el !== Utils.formatStringCharacters(this.item)
        )
        new Search(this.item).getRecipesMatchingTagsAndSearch(this.category)
        activeFilterButton.remove()
        this.suggestedElement.setAttribute("data-filter-visible", true)
      }
    })
  }
}
