export interface CartItemType {
  id: number
  productId: number
  name: string
  price: number
  image: string
  quantity: number
}

export class CartItem {
  constructor(
    public id: number,
    public productId: number,
    public name: string,
    public price: number,
    public image: string,
    public quantity: number,
  ) {}

  static fromJson(json: CartItemType) {
    return new CartItem(json.id, json.productId, json.name, json.price, json.image, json.quantity)
  }

  getSubtotal() {
    return this.quantity * this.price
  }

  static fromRow(row: CartItemType) {
    return new CartItem(row.id, row.productId, row.name, row.price, row.image, row.quantity)
  }
}
