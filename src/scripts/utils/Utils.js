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
}
