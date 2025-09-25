# Trabajo integrador mongoose, JWT, BCRYPT.

## Relaciones

### User <-> profile
Para esta relación se eligió embebido pues si bien User y Profile podrían ser modelos separados, funcionan mejor juntos, y se aprovecha código al ponerlos de forma embebida.
Ventajas: mejor manejo de información, ahorro de código y de datos.
Desventajas: Depende de User completamente. Se deben rellenar muchos campos al mismo tiempo.

### User <-> Article
Para esta relación se eligió referenciado pues tanto User como Article son modelos que deben ser independientes, no como embebido.
Ventajas: No depende completamente de user, tiene integridad propia, se puede usar el populate para divisar mejor los artículos que tiene cada usuario.
Desventajas: Más espacio acaparado, si un usuario quiere borrar sus artículos debe borrarlos uno por uno.

### Article <-> Comment
Para esta relación se eligió referenciado porque no todos los comentarios pueden pertenecer al mismo artículo y esto dificultaría las operaciones como delete o getAll.
Ventajas: Los comentarios tienen integridad propia, se pueden realizar consultas de forma más independiente.
Desventajas: Más espacio acaparado.

### Article <-> tag
Para esta relación se eligió referenciado pues no todos los tags pueden pertenecer al mismo artículo.
Ventajas: Los tags tienen integridad propia y se pueden realizar consultas de forma independiente.
Desventajas: Espacio acaparado.

# Endpoints

##  Autenticación

### `POST /api/auth/register`
Registrar un nuevo usuario.
```http
POST /api/auth/register

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "biography": "Desarrollador web",
    "birthDate": "1990-01-01"
  }
}
```

**Response:**
```json
{
  "ok": true,
  "msg": "user created successfully",
  "data": {
    "user": {
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "profile": {
        "firstName": "John",
        "lastName": "Doe"
      }
    },
    "token": "jwt_token_here"
  }
}
```

### `POST /api/auth/login`
Iniciar sesión.
```http
POST /api/auth/login


{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### `GET /api/auth/profile`
Obtener perfil del usuario autenticado.
```http
GET /api/auth/profile

```

### `PUT /api/auth/profile`
Actualizar perfil del usuario.
```http
PUT /api/auth/profile


{
  "profile": {
    "biography": "Desarrollador full-stack"
  }
}
```

### `POST /api/auth/logout`
Cerrar sesión.
```http
POST /api/auth/logout

```

##  Users

### `GET /api/users`
Listar todos los usuarios (requiere rol admin).
```http
GET /api/users
```

### `GET /api/users/:id`
Obtener usuario por ID (requiere rol admin).
```http
GET /api/users/60f7b3b3b3b3b3b3b3b3b3b3
```

### `PUT /api/users/:id`
Actualizar usuario (requiere rol admin).
```http
PUT /api/users/60f7b3b3b3b3b3b3b3b3b3b3


{
  "role": "admin"
}
```

### `DELETE /api/users/:id`
Eliminar usuario (requiere rol admin).
```http
DELETE /api/users/60f7b3b3b3b3b3b3b3b3b3b3

```

##  Articles

### `POST /api/articles`
Crear un nuevo artículo.
```http
POST /api/articles

{
  "title": "Introducción a Node.js",
  "content": "Node.js es un entorno de ejecución de JavaScript del lado del servidor...",
  "excerpt": "Una introducción completa a Node.js",
  "status": "published"
}
```

### `GET /api/articles`
Listar artículos publicados.
```http
GET /api/articles
```

### `GET /api/articles/:id`
Obtener artículo específico.
```http
GET /api/articles/60f7b3b3b3b3b3b3b3b3b3b3
```

### `PUT /api/articles/:id`
Actualizar artículo (solo autor o admin).
```http
PUT /api/articles/60f7b3b3b3b3b3b3b3b3b3b3


{
  "title": "Introducción a Node.js - Actualizado",
  "status": "archived"
}
```

### `DELETE /api/articles/:id`
Eliminar artículo (solo autor o admin).
```http
DELETE /api/articles/60f7b3b3b3b3b3b3b3b3b3b3
```

### `GET /api/articles/my`
Obtener artículos del usuario autenticado.
```http
GET /api/articles/my
```

##  Comments

### `POST /api/comments`
Crear comentario en un artículo.
```http
POST /api/comments


{
  "content": "Excelente artículo sobre Node.js",
  "article": "60f7b3b3b3b3b3b3b3b3b3b3"
}
```

### `GET /api/comments/article/:articleId`
Obtener comentarios de un artículo.
```http
GET /api/comments/article/60f7b3b3b3b3b3b3b3b3b3b3
```

### `GET /api/comments/my`
Obtener comentarios del usuario autenticado.
```http
GET /api/comments/my

```

### `PUT /api/comments/:id`
Actualizar comentario (solo autor o admin).
```http
PUT /api/comments/60f7b3b3b3b3b3b3b3b3b3b3


{
  "content": "Comentario actualizado"
}
```

### `DELETE /api/comments/:id`
Eliminar comentario (solo autor o admin).
```http
DELETE /api/comments/60f7b3b3b3b3b3b3b3b3b3b3

```

##  Tags

### `POST /api/articles/:articleId/tags/:tagId`
Crear y asociar etiqueta a artículo.
```http
POST /api/articles/60f7b3b3b3b3b3b3b3b3b3b3/tags/tecnologia


{
  "name": "tecnología",
  "description": "Artículos relacionados con tecnología"
}
```

### `DELETE /api/articles/:articleId/tags/:tagId`
Eliminar etiqueta de artículo.
```http
DELETE /api/articles/60f7b3b3b3b3b3b3b3b3b3b3/tags/tecnologia

```

# Instrucciones de instalación y configuración.

1. Clonar repositorio
```bash
git clone https://github.com/caramelin-n/trabajo-practico-integrador-2.git
cd trabajo-practico-integrador-2
```

2. Instalar dependencias (npm i)
```bash
npm install
```

3. Configurar el entorno.
Crear un archivo .env al nivel de app.js, copiar la plantilla de .env.example, rellenarlo con tus propias variables.

4. Ejecutar el servidor.
```bash
npm run dev
```
Ya que en este trabajo se usa nodemon, se usará nodemon con la ejecución.

# Validaciones personalizadas

Se utilizaron una validaciones personalizadas para validar que no exista otro campo igual en caso de que lo requiera.

