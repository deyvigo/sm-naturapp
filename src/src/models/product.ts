export interface ProductType {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating: number
  benefits: string[]
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public image: string,
    public category: string,
    public stock: number,
    public rating: number = 0,
    public benefits: string[] = [],
  ) {}

  static fromJson(json: ProductType) {
    return new Product(
      json.id,
      json.name,
      json.description,
      json.price,
      json.image,
      json.category,
      json.stock,
      json.rating,
      json.benefits,
    )
  }

  isAvailable() {
    return this.stock > 0
  }

  getFormattedPrice() {
    return `S/. ${this.price.toFixed(2)}`
  }
}
