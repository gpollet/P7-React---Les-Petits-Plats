import { chevronDownIcon } from "../store/store.js"

export function createRecipeFilters(container) {

  container.innerHTML += `<div class="top-filters_container">
<label>
<input class="top-filters_ingredients" name="ingredients" placeholder="Ingrédients" aria-label="Rechercher par ingrédients"></input>${chevronDownIcon}
</label>

<label>
<input class="top-filters_appareils" name="appareils" placeholder="Appareils" aria-label="Rechercher par appareils"></input>${chevronDownIcon}
</label>

<label>
<input class="top-filters_ustensiles" name="ustensiles" placeholder="Ustensiles" aria-label="Rechercher par ustensiles"></input>
${chevronDownIcon}
</label>
</div>`
}
