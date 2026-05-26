# API Documentation - InduLex

## Base URL: `http://localhost:5000/api/v1`

### Usuarios (`/users`)

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| POST | `/register` | Registra un nuevo usuario | Público |
| POST | `/login` | Inicia sesión local | Público |
| POST | `/google-login` | Inicia sesión con Google | Público |
| PATCH | `/update/:id` | Actualiza perfil de usuario | Privado |

### Productos (`/products`)

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/` | Lista todos los productos (soporta filtros y búsqueda) | Público |
| GET | `/:id` | Detalle de un producto | Público |
| POST | `/` | Crea un nuevo producto | Admin |
| PATCH | `/:id` | Actualiza un producto | Admin |
| DELETE | `/:id` | Elimina un producto | Admin |

### Pedidos (`/orders`)

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| POST | `/` | Crea un nuevo pedido | Privado |
| GET | `/user/:id` | Lista pedidos de un usuario | Privado |

---

### Formato de Respuesta Exitosa
```json
{
  "status": "success",
  "data": { ... }
}
```

### Formato de Error
```json
{
  "status": "fail" o "error",
  "message": "Descripción del error"
}
```
