# Arquitectura del Sistema - InduLex

## Stack Tecnológico (MERN)

InduLex utiliza la pila MERN (MongoDB, Express, React, Node.js) para garantizar escalabilidad y rendimiento.

### 1. Frontend (React + Vite)
- **Lenguaje:** TypeScript para tipado estático y seguridad.
- **Estilos:** Vanilla CSS con enfoque en Glassmorphism y animaciones fluidas.
- **Estado:** React Context API para Autenticación, Carrito y Notificaciones.
- **Internacionalización:** i18next para soporte multi-idioma (ES/EN).

### 2. Backend (Node.js + Express)
- **Arquitectura:** MVC (Model-View-Controller) con servicios desacoplados.
- **Seguridad:** Middlewares de manejo de errores globales y validación de tokens.
- **Logging:** Sistema de logs personalizado para seguimiento de errores y actividad.

### 3. Base de Datos (MongoDB)
- **ORM:** Mongoose para el modelado de esquemas y validación.
- **Estructura:** NoSQL, optimizada para lecturas rápidas de catálogos y gestión de pedidos.

### 4. Autenticación
- **Híbrida:** Soporte para JWT (futuro) y Google OAuth 2.0 (Google Auth Library).

## Flujo de Datos
1. El Cliente (React) realiza una petición al API.
2. El Router del Backend redirige al Controlador correspondiente.
3. El Controlador utiliza Servicios para interactuar con los Modelos de Mongoose.
4. La respuesta se formatea mediante un `responseHandler` uniforme.
