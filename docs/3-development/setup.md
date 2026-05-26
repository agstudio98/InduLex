# Setup Guide - InduLex

## Requisitos Previos
- Node.js v20+
- pnpm v8+
- MongoDB v6+ corriendo localmente o en Atlas.

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repo-url>
   cd InduLex
   ```

2. **Configuración del Backend:**
   ```bash
   cd backend
   pnpm install
   ```
   - Crea un archivo `.env` basado en `.env.example` y añade tu `MONGO_URI` y `GOOGLE_CLIENT_ID`.

3. **Configuración del Frontend:**
   ```bash
   cd ../frontend/indulex
   pnpm install
   ```

## Ejecución en Desarrollo

### Backend
```bash
cd backend
pnpm dev
```
El servidor correrá en `http://localhost:5000`.

### Frontend
```bash
cd frontend/indulex
pnpm dev
```
La aplicación será accesible en `http://localhost:5173`.

## Ejecución en Producción
Se recomienda el uso de **Systemd** para gestionar los servicios (ver carpeta `/systemd`).
