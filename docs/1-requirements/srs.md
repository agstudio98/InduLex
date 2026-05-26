# Software Requirements Specification (SRS) - InduLex

## 1. Introducción
InduLex es una aplicación web de e-commerce diseñada para ofrecer una experiencia de compra de ropa fluida, segura y visualmente atractiva.

## 2. Descripción General
La plataforma permite a los usuarios navegar por un catálogo de productos, gestionar un carrito de compras, realizar pagos y administrar su perfil personal.

## 3. Requerimientos Funcionales
- **RF1: Autenticación:** El sistema debe permitir el registro e inicio de sesión local y mediante Google OAuth 2.0.
- **RF2: Catálogo de Productos:** Los usuarios pueden ver productos, filtrarlos por categoría y buscarlos por nombre.
- **RF3: Gestión de Carrito:** Los usuarios pueden añadir, eliminar y modificar la cantidad de productos en su carrito.
- **RF4: Gestión de Perfil:** Los usuarios pueden actualizar sus datos personales (dirección, ciudad, código postal) y cambiar su avatar.
- **RF5: Procesamiento de Pagos:** Soporte para múltiples métodos de pago (Visa, Mastercard, MercadoPago).
- **RF6: Soporte al Cliente:** Canal de comunicación/chat para soporte técnico.

## 4. Requerimientos No Funcionales
- **RNF1: Seguridad:** Protección de rutas sensibles y almacenamiento seguro de credenciales.
- **RNF2: Rendimiento:** Carga rápida de imágenes y respuesta del servidor en menos de 500ms.
- **RNF3: Usabilidad:** Diseño responsivo para móviles y escritorio con modo oscuro/claro.
- **RNF4: Disponibilidad:** El sistema debe estar disponible el 99.9% del tiempo.

## 5. Requerimientos de Interfaz
- Interfaz moderna basada en Glassmorphism.
- Notificaciones (Toasts) para feedback inmediato de acciones.
