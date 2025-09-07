# Sistema de Inventario - Backend

Backend desarrollado con NestJS para el sistema de inventario móvil.

## Características

- **Base de datos**: MySQL con TypeORM
- **Autenticación**: Login básico sin encriptación
- **Imágenes**: Integración con Cloudinary
- **APIs REST**: CRUD completo para todas las entidades
- **Movimientos de inventario**: Ingreso, Egreso, Traslado, Eliminación, Auditoría

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copiar el archivo `.env.example` a `.env` y configurar las variables:

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus valores:

```env
# Base de datos MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=inventario_db

# Puerto del servidor
PORT=3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Configuración de entorno
NODE_ENV=development
```

### 3. Configurar base de datos

1. Crear la base de datos MySQL:
```sql
CREATE DATABASE inventario_db;
```

2. Ejecutar el servidor en modo desarrollo para crear las tablas:
```bash
npm run start:dev
```

3. (Opcional) Cargar datos de ejemplo:
```bash
mysql -u root -p inventario_db < database-init.sql
```

## Ejecutar la aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
```

El servidor estará disponible en `http://localhost:3000/api`

## Endpoints principales

### Autenticación
- `POST /api/usuarios/login` - Iniciar sesión

### Bodegas
- `GET /api/bodegas` - Listar bodegas
- `POST /api/bodegas` - Crear bodega

### Productos
- `GET /api/productos` - Listar productos (con paginación y búsqueda)
- `POST /api/productos` - Crear producto
- `POST /api/productos/:id/imagen` - Subir imagen

### Items
- `GET /api/items` - Listar items
- `GET /api/items/validate/:codigo` - Validar código para escaneo

### Movimientos
- `GET /api/movimientos` - Historial de movimientos
- `POST /api/movimientos` - Crear movimiento

## Estructura del proyecto

```
src/
├── entities/          # Entidades de TypeORM
├── modules/           # Módulos de NestJS
│   ├── bodegas/
│   ├── usuarios/
│   ├── secciones/
│   ├── productos/
│   ├── items/
│   └── movimientos/
├── config/            # Configuraciones
└── common/            # Utilidades comunes
```

## Notas importantes

- Las contraseñas se almacenan en texto plano (sin encriptación)
- Las imágenes se redimensionan automáticamente a 256x256
- Los movimientos actualizan automáticamente el inventario
- Las auditorías no modifican el inventario, solo registran