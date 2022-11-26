// Returns a chevron up/down icon depending on the var being passed down
export class chevronIcon {
  constructor() {
    this.chevronUp =
      '<path d="M256 82.7l22.6 22.6 192 192L493.3 320 448 365.3l-22.6-22.6L256 173.3 86.6 342.6 64 365.3 18.7 320l22.6-22.6 192-192L256 82.7z"/>'
    this.chevronDown =
      '<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>'
  }

  createChevronIcon(chevron) {
    return `<svg tabindex="0" class="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->${
      chevron == "chevron-down" ? this.chevronDown : this.chevronUp
    }
    </svg>`
  }
}

// Stores elements for each filter category
export let dataset = { ingredient: [], ustensils: [], appliance: [] }

// Stores the display of the top filters
export let filterDisplayStatus = { ingredient: false, ustensils: false, appliance: false }
