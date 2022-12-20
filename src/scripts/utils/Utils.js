export class Utils {
  // Converts a string to lower cases then replace diacritic and special characters with their ASCII counterpart
  static formatStringCharacters(string) {
    return string
      .toLowerCase()
      .replace(/[,]/, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/gi, "")
  }

  // Sorts the top filters items to display them in alphabetical order
  static sortData(dataset) {
    for (let [key, value] of Object.entries(dataset)) {
      value.sort()
    }
  }

  // Adds diacritic and special characters back to ASCII top filters names
  static getTopFiltersDisplayNames(filter) {
    if (filter === "ingredient") {
      return "Ingrédients"
    } else if (filter == "appliance") {
      return "Appareils"
    } else if (filter == "ustensils") {
      return "Ustensiles"
    }
  }

  // Removes all uppercases from the provided string, then returns it with the first letter converted to an uppercase
  static stringFirstLetterToUpperCase(string) {
    let formattedString = string.toLowerCase().replace(string[0], string[0].toUpperCase())
    return formattedString
  }

    // Split a single string into arrays containing a single keyword, and removes words shorter than 3 characters
  static splitKeywords = (stringToSplit) => {
    return stringToSplit.split(" ").filter((word) => word.length >= 3)
  }

// Checks if a keyword has already been identified for the recipe being processed.
static checkKeywords = (keyword, keywordList) => {
  keyword.map((el) => {
    if (!keywordList.includes(el)) keywordList.push(el)
    return keywordList
  })
}
}

// Returns a chevron up/down icon depending on the var being passed down
export class chevronIcon {
  constructor() {
    this.chevronUp =
      '<path d="M256 82.7l22.6 22.6 192 192L493.3 320 448 365.3l-22.6-22.6L256 173.3 86.6 342.6 64 365.3 18.7 320l22.6-22.6 192-192L256 82.7z"/>'
    this.chevronDown =
      '<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>'
  }

  createChevronIcon(chevron) {
    return `<svg tabindex="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->${
      chevron == "chevron-down" ? this.chevronDown : this.chevronUp
    }
    </svg>`
  }

  updateChevronIcon(chevron) {
    return `${chevron == "chevron-down" ? this.chevronDown : this.chevronUp}`
  }
}

export const closeIcon =
  '<svg class="active-filter-close_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>'
