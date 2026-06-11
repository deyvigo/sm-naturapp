type StatusType = 'pendiente' | 'procesando' | 'enviado' | 'entregado'

export interface ItemType {
  productId: number
  name: string
  price: number
  quantity: number
}

export interface OrderType {
  id: number
  items: ItemType[]
  total: number
  status: StatusType
  date: string
  address: string
}

export class Order {
  constructor(
    public id: number,
    public items: ItemType[] = [],
    public total: number,
    public status: StatusType = 'pendiente',
    public date: string = new Date().toISOString(),
    public address: string = '',
  ) {}

  static fromJson(json: OrderType) {
    return new Order(json.id, json.items, json.total, json.status, json.date, json.address)
  }

  getFormattedDate() {
    return new Date(this.date).toLocaleDateString('es-PE')
  }

  getStatusColor() {
    const colors: Record<StatusType, string> = {
      pendiente: '#F39C12',
      procesando: '#3498DB',
      enviado: '#8E44AD',
      entregado: '#27AE60',
    }
    return colors[this.status] || '#95A5A6'
  }
}
