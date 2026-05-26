# Modelos de Base de Datos - InduLex

## Esquemas de MongoDB (Mongoose)

### 1. User
- `nombre`: String (Requerido)
- `email`: String (Requerido, Único)
- `password`: String (Requerido para local)
- `imagen`: String (URL o Seed de avatar)
- `direccion`: String
- `ciudad`: String
- `codigoPostal`: String
- `paymentMethods`: Array (IDs de Payment)

### 2. Product
- `nombre`: String (Requerido)
- `precio`: Number (Requerido)
- `categoria`: String (Requerido: Hoodies, Tees, etc.)
- `descripcion`: String
- `imagen`: String (URL)
- `stock`: Number (Default: 0)

### 3. Order
- `usuario`: ObjectId (Ref: User)
- `productos`: Array (Product IDs + Cantidad)
- `total`: Number
- `estado`: String (Pending, Paid, Shipped, Delivered)
- `fecha`: Date (Default: now)

### 4. Payment
- `tipo`: String (Visa, Mastercard, MercadoPago)
- `last4`: String
- `expiry`: String
- `user`: ObjectId (Ref: User)
