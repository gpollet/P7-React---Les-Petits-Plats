export function createHeader(container) {
  const header = document.createElement("header")
  container.appendChild(header)
  container.class = "header"
  header.innerHTML = `<img src="../assets/logo.png" alt="Logo Les petits plats" class="header_logo"></img>`
}