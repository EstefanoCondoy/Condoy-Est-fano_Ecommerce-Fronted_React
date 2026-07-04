# API REST de E-commerce

Proyecto académico con Java 17, Spring Boot 3, Maven y PostgreSQL. Implementa usuarios, productos y recibos con detalle de compra, validaciones, BCrypt y manejo global de errores.

## Requisitos

- JDK 17 o posterior
- Maven 3.9+
- PostgreSQL

## Preparación

Crear la base de datos:

```sql
CREATE DATABASE ecommerce;
```

Las credenciales pueden configurarse con variables de entorno. Los valores predeterminados son:

```text
DB_URL=jdbc:postgresql://localhost:5433/ecommerce
DB_USER=postgres
DB_PASSWORD=123456
```

## Ejecución

```powershell
.\mvnw.cmd clean spring-boot:run
```

En Linux o macOS, usar `./mvnw clean spring-boot:run`.

Para una demostración inmediata sin configurar PostgreSQL:

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=demo"
```

- API: http://localhost:8000
- Swagger: http://localhost:8000/swagger-ui/index.html

## Rutas principales

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/users/register` | Registrar usuario |
| POST | `/api/users/login` | Iniciar sesión |
| GET, PUT, DELETE | `/api/users/{id}` | Consultar, actualizar o eliminar usuario |
| POST, GET | `/api/products` | Crear o listar productos |
| GET, PUT, DELETE | `/api/products/{id}` | Operaciones por producto |
| POST, GET | `/api/receipts` | Crear o listar recibos |
| GET, DELETE | `/api/receipts/{id}` | Consultar o eliminar recibo |
| GET | `/api/receipts/user/{userId}` | Recibos de un usuario |

La creación de recibos es transaccional: el total se calcula con precios de la base de datos y el stock se descuenta solo si toda la compra se completa correctamente.

## Evidencias

Las capturas de las pruebas ejecutadas se encuentran en `docs/capturas-postman`.
