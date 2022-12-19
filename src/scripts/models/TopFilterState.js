import { store } from "../store/store.js"
import { chevronIcon, Utils } from "../utils/Utils.js"


export class filterButtonState {
  constructor(event, chevron) {
    this.event = event
    this.chevron = chevron
    this.filterSuggestionsContainer =
      this.event.target.closest(".top-filters_container").children[2]
    this.filterCategory = this.filterSuggestionsContainer.getAttribute("data-filter-category")
    this.currentDisplayState = store.filterDisplayStatus[this.filterCategory]
  }

  // When opening a new filter menu or input, makes sure any other filter menu opened is being closed before opening the new one
  static filtersStateListener = () => {
    const filtersButtons = document.querySelectorAll(
      "[data-filter-visible].top-filters_suggestions-container"
    )
    for (let button of filtersButtons) {
      const buttonCategory = button.getAttribute("data-filter-category")
      button.previousElementSibling.innerHTML = new chevronIcon().updateChevronIcon("chevron-down")
      button.setAttribute("data-filter-visible", false)
      store.filterDisplayStatus[buttonCategory] = false
      // When closing filter menu, sets category name back as placeholder
      const newPlaceholder = Utils.getTopFiltersDisplayNames(buttonCategory)
      const filterInput = document.querySelector(`.top-filters_${buttonCategory}`)
      filterInput.setAttribute("data-active-filter", "false")
      filterInput.setAttribute("placeholder", `${newPlaceholder}`)
    }
  }

  // Gets the current display state of the targetted filter. If it is already being displayed, hides it. If not, displays it.
  manageState() {
    filterButtonState.filtersStateListener()
    if (this.currentDisplayState == false) {
      // Opens selected menu and closes the other menus
      this.displayFilterList()
    } else {
      this.hideFilterList()
    }
  }

  displayFilterList() {
    Object.entries(store.filterDisplayStatus).forEach(
      (filterCategory) => (filterCategory.value = false)
    )
    this.event.target.classList = "chevron-up"
    this.chevron.innerHTML = new chevronIcon().updateChevronIcon("chevron-up")
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", true)
    store.filterDisplayStatus[this.filterCategory] = true
    const newPlaceholder = Utils.getTopFiltersDisplayNames(this.filterCategory).toLowerCase()
    const filterInput = document.querySelector(`.top-filters_${this.filterCategory}`)
    filterInput.setAttribute(
      "placeholder",
      `Rechercher un ${newPlaceholder.slice(0, newPlaceholder.length - 1)}`
    )
    filterInput.setAttribute("data-active-filter", true)
  }

  hideFilterList() {
    this.event.target.classList = "chevron-down"
    this.chevron.innerHTML = new chevronIcon().updateChevronIcon("chevron-down")
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", false)
    store.filterDisplayStatus[this.filterCategory] = false
  }
}