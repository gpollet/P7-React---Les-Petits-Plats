export class Utils {
  // Converts a string to lower cases then replace diacritic and special characters with their ASCII counterpart
  static formatStringCharacters(string) {
    return (
      string
        .toLowerCase()
        .replace(/[,]/, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gi, "")
    )
  }
}