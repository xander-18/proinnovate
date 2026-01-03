## Estructura

- **app/app.js**: Configuración principal de Express y rutas.
- **app/server.js**: Arranque del servidor y conexión a la base de datos.
- **app/src/routes/userRoutes.js**: Rutas de usuario (públicas y protegidas).
- **app/src/controllers/userController.js**: Lógica de negocio para usuarios.
- **app/src/models/User.js**: Modelo de usuario en MongoDB.
- **app/middleware/clerkAuth.js**: Middleware para autenticación con Clerk.
- **app/src/config/database.js**: Conexión a MongoDB.
- **.env.example**: Variables de entorno requeridas (guía, no contiene datos sensibles).

## Instalación

1. Clona el repositorio.
2. Instala dependencias:
   ```
   npm install
   ```
3. Copia `.env.example` a `.env` y completa los valores.
4. Inicia el servidor:
   ```
   node app/server.js
   ```

## Uso

- Usa autenticación Clerk para rutas protegidas (`/api/users/me`, `/api/users/sync`).

## Notas

- No subas tu archivo `.env` con datos sensibles.
- Usa `.env.example` como referencia para configurar tu entorno local.
