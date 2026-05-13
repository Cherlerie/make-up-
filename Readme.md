# 💄 GroowgoodBeauty - Gestión de Inventario de Maquillaje

![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3?logo=bootstrap)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-Aiven-4479A1?logo=mysql)
![GitHub](https://img.shields.io/badge/GitHub-Repositorio-181717?logo=github)

---

##  Descripción del Proyecto

**GroowgoodBeauty** es un sistema completo de gestión de inventario para productos de maquillaje. Permite administrar un catálogo de productos con operaciones CRUD (Crear, Leer, Actualizar, Eliminar), filtros de búsqueda y una interfaz moderna y responsiva.

> **Objetivo:** Desarrollar una plataforma funcional con arquitectura cliente-servidor, donde el frontend y backend se comunican mediante una API RESTful.

---

##  Características Principales

| Módulo | Funcionalidad |
|--------|---------------|
| **Listado de productos** | Visualización de todo el inventario en tabla responsiva |
| **Agregar producto** | Formulario con validaciones para nuevos productos |
| **Editar producto** | Formulario precargado con datos existentes |
| **Eliminar producto** | Eliminación con confirmación previa |
| **Filtros dinámicos** | Búsqueda por marca o categoría en tiempo real |
| **Diseño responsivo** | Adaptable a dispositivos móviles y tablets |

---

##  Tecnologías Utilizadas

| Capa | Tecnología | Descripción |
|------|------------|-------------|
| **Frontend** | HTML5, CSS3, Bootstrap 5 | Interfaz de usuario responsiva |
| **Frontend** | JavaScript (Vanilla) | Lógica del cliente, peticiones fetch |
| **Backend** | Node.js + Express | API RESTful del servidor |
| **Base de Datos** | MySQL (Aiven) | Persistencia de datos en la nube |
| **ORM** | Sequelize | Modelado y consultas a la BD |
| **Despliegue** | Render | Hosting del backend y frontend |
| **Control de Versiones** | Git + GitHub | Repositorio remoto y colaboración |

---

##  Estructura del Proyecto

GroowgoodBeauty/
│
├── 📂 backend/
│ ├── 📂 config/
│ │ └── database.js # Configuración de Sequelize
│ ├── 📂 controllers/
│ │ └── productos.controller.js
│ ├── 📂 middlewares/
│ │ └── validaciones.js
│ ├── 📂 models/
│ │ └── Producto.js
│ ├── 📂 routes/
│ │ └── productos.routes.js
│ ├── 📄 app.js
│ ├── 📄 package.json
│ └── 📄 .env
│
├── 📂 frontend/
│ ├── 📄 index.html
│ ├── 📄 nuevo.html
│ ├── 📄 editar.html
│ ├── 📄 index.css
│ ├── 📄 nuevo.css
│ ├── 📄 editar.css
│ ├── 📄 index.js
│ ├── 📄 nuevo.js
│ └── 📄 editar.js
│
└── 📄 README.md


---

##  API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/productos` | Obtener todos los productos (con filtros) |
| `GET` | `/api/productos/:id` | Obtener un producto específico |
| `POST` | `/api/productos` | Agregar un nuevo producto |
| `PUT` | `/api/productos/:id` | Actualizar un producto |
| `DELETE` | `/api/productos/:id` | Eliminar un producto |

### Filtros disponibles

| Query param | Ejemplo | Descripción |
|-------------|---------|-------------|
| `marca` | `?marca=MAC` | Filtra por marca |
| `categoria` | `?categoria=Labiales` | Filtra por categoría |

### Ejemplo de respuesta (GET /api/productos/1)

```json
{
  "id": 1,
  "nombre": "Labial Mate Rojo",
  "marca": "MAC",
  "categoria": "Labiales",
  "precio": 25.99,
  "stock": 50
}

Instrucciones para Ejecutar el Proyecto
- Requisitos previos

Node.js (v18 o superior)
MySQL (local o Aiven)
Git

Paso 1: Clonar el repositorio
git clone https://github.com/Cherlerie/make-up-.git
cd make-up-

Paso 2: Instalar dependencias del backend
cd backend
npm install

Paso 3: Configurar variables de entorno
Crea un archivo .env en backend/:

PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=makeup_db

Paso 4: Iniciar el servidor
node app.js

Paso 5: Abrir la aplicación
Ve a http://localhost:3000/index.html

Equipo de Desarrollo
Nombre	Rol	GitHub
Cherlerie	Backend Developer	@Cherlerie
Hasley Mariel Forch	Frontend Developer	@hasley
Karla Princesa Garcia	Creacion de Readme y estetica de los css	@Karlita28

