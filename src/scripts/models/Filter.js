export class Filter {
  constructor(data) {
    this.ingredients = data
    this.ustensils = data.ustensils
    this.appliance = data.appliance
  }

  fillStoreData() {
    console.log(this)
  }
}