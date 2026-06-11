## Estructura de directorios

### Estructura principal del repositorio

```
/NaturApp
├── app/
│   └── src/
│       ├── app/
│       │   ├── (tabs)/
│       │   └── product/
│       ├── components/
│       ├── constants/
│       ├── hooks/
│       └── src/
│           ├── components/
│           ├── models/
│           ├── services/
│           └── viewmodels/
├── back/
│   └── src/
│       └── routes/
└── images/
```

### Estructura de la aplicación móvil

```
/NaturApp/app
├── src/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── cart.tsx
│   │   │   ├── home.tsx
│   │   │   ├── orders.tsx
│   │   │   └── profile.tsx
│   │   ├── product/
│   │   │   └── [id].tsx
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── src/
│   │   ├── components/
│   │   │   ├── cart-item-row.tsx
│   │   │   ├── category-chip.tsx
│   │   │   └── product-card.tsx
│   │   ├── models/
│   │   │   ├── cart-item.ts
│   │   │   ├── order.ts
│   │   │   └── product.ts
│   │   ├── services/
│   │   │   ├── api-service.ts
│   │   │   ├── database-service.ts
│   │   │   └── storage-service.ts
│   │   └── viewmodels/
│   │       ├── use-cart.ts
│   │       ├── use-order.ts
│   │       ├── use-products.ts
│   │       └── use-profile.ts
│   └── global.css
├── .gitignore
├── .prettierrc.json
├── LICENSE
├── README.md
├── app.json
├── expo-env.d.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Pantallas

### 1. Pantalla Home

|                  Home                   |                Home con filtros                |                  Home con búsqueda                  |
| :-------------------------------------: | :--------------------------------------------: | :-------------------------------------------------: |
| <img src="images/main.png" width="250"> | <img src="images/main-filter.png" width="250"> | <img src="images/main-searchquery.png" width="250"> |

### 2. Pantalla detalle de producto

|                Detalle de producto                |
| :-----------------------------------------------: |
| <img src="images/product-detail.png" width="250"> |

### 3. Pantalla de carrito

|                        Carrito                         |             Eliminar producto del carrito              |
| :----------------------------------------------------: | :----------------------------------------------------: |
|        <img src="images/cart.png" width="250">         |     <img src="images/cart-delete.png" width="250">     |
|                 Cart realizar pedido 1                 |                 Cart realizar pedido 2                 |
| <img src="images/cart-order-action-1.png" width="250"> | <img src="images/cart-order-action-2.png" width="250"> |

### 4. Pantalla pedido

|            Órdenes realizadas             |
| :---------------------------------------: |
| <img src="images/orders.png" width="250"> |

### 5. Pantalla de login

|                  Login                   |
| :--------------------------------------: |
| <img src="images/login.png" width="250"> |
