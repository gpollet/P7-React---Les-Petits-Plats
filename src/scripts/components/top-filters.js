import { chevronDownIcon } from "../store/store.js"

export function createRecipeFilters(container) {

  container.innerHTML += `<div class="top-filters_container">
<label>
<input class="top-filters_ingredients" name="ingredients" placeholder="Ingrédients"></input>${chevronDownIcon}
</label>

<label>
<input class="top-filters_appareils" name="appareils" placeholder="Appareils"></input>${chevronDownIcon}
</label>

<label>
<input class="top-filters_ustensiles" name="ustensiles" placeholder="Ustensiles"></input>
${chevronDownIcon}
</label>
</div>`
}
