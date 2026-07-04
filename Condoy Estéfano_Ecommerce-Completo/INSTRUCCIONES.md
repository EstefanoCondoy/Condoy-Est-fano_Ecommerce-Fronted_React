# E-commerce completo - Condoy Estéfano

Este paquete contiene los dos proyectos:

- `Condoy Estéfano_BackEnd-SpringBoot`: API REST con Spring Boot y PostgreSQL.
- `Condoy Estéfano_FrontEnd-React`: interfaz web con React y TypeScript.

## 1. Preparar PostgreSQL

Crear la base de datos:

```sql
CREATE DATABASE ecommerce;
```

Configuración predeterminada:

```text
Puerto: 5433
Usuario: postgres
Contraseña: 123456
Base de datos: ecommerce
```

## 2. Ejecutar el backend

Abrir PowerShell en la carpeta del backend:

```powershell
.\mvnw.cmd spring-boot:run
```

La API quedará disponible en:

```text
http://localhost:8000
http://localhost:8000/swagger-ui/index.html
```

## 3. Ejecutar el frontend

Abrir otra ventana de PowerShell en la carpeta del frontend:

```powershell
npm install
npm run dev
```

Abrir:

```text
http://localhost:5173
```

`node_modules` no se incluye porque se genera automáticamente con `npm install`.

## Usuario de prueba

```text
Correo: estefano@epn.edu.ec
Contraseña: 123456
```
