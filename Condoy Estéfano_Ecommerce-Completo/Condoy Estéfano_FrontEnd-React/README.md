# FrontEnd React - E-commerce

Aplicación React + TypeScript conectada con la API Spring Boot del laboratorio.

## Funcionalidades

- Catálogo consultado desde PostgreSQL.
- Búsqueda y ordenamiento de productos.
- Registro e inicio de sesión.
- Perfil editable e historial de recibos.
- Carrito persistente con control de cantidades.
- Checkout conectado a `/api/receipts`.
- Tema claro/oscuro y diseño responsivo.

## Requisitos

- Backend Spring Boot ejecutándose en `http://localhost:8000`.
- Node.js 20 o posterior.

## Ejecución

```powershell
npm install
npm run dev
```

Abrir `http://localhost:5173`.

La URL del backend puede modificarse creando un archivo `.env`:

```text
VITE_API_URL=http://localhost:8000
```

## Datos de prueba

```text
Correo: estefano@epn.edu.ec
Contraseña: 123456
```
