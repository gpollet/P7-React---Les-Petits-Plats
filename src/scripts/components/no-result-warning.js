export const displayWarning = () => {
  const cardsContainer = document.querySelector(".recipes-list_container")
  const errorContainer = document.createElement("div")
  errorContainer.className = "search-error_no-result"
  errorContainer.innerHTML = `<p>Aucune recette ne correspond à vos critères. Vous pouvez chercher "tarte aux pommes", "poisson"...</p>`
  if (!document.querySelector(".search-error_no-result")) cardsContainer.appendChild(errorContainer)
}

export const hideWarning = () => {
  const errorContainer = document.querySelector(".search-error_no-result")
  if (errorContainer) errorContainer.remove()
}