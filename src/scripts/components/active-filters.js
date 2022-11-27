import { userSelectedFilters } from "../store/store.js"
import { closeIcon, Utils } from "../utils/Utils.js"

export class activeFilters {
  constructor(category, item) {
    this.category = category
    this.item = item
    this.container = document.querySelector(".active-filters_container")
  }

  static createActiveFiltersContainer(parent) {
    const activeFiltersContainer = document.createElement("div")
    activeFiltersContainer.className = "active-filters_container"
    parent.appendChild(activeFiltersContainer)
  }

  // Adds selected item to active filter if it is not already active
  addActiveFilter() {
    const newActiveFilterButton = document.createElement("div")
    newActiveFilterButton.className = `active-filters_item ${this.category}`
    newActiveFilterButton.textContent = `${this.item}`
    newActiveFilterButton.innerHTML += `${closeIcon}`
    this.container.appendChild(newActiveFilterButton)
    userSelectedFilters[this.category].push(this.item)
    this.removeActiveFilterEvent(newActiveFilterButton)
  }

  // Removes active filter from the store and the DOM when clicking on its "X" icon
  removeActiveFilterEvent(activeFilterButton) {
    activeFilterButton.addEventListener("click", (event) => {
      if (event.target.classList.value == "active-filter-close_button") {
        userSelectedFilters[this.category] = userSelectedFilters[this.category].filter(
          (el) => el !== this.item
        )
        activeFilterButton.remove()
      }
    })
  }
}
