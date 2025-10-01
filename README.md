# 🌐 Núcleo IA (AI Core)

**Núcleo IA** (*AI Core*) es el portal interno que centraliza todos los recursos de **inteligencia artificial** en Trópica: licencias, softwares, tutoriales, documentos, guías, grabaciones de sesiones UFO (Universe of Future Opportunities) y proyectos estratégicos.

Su propósito es servir como **hub de conocimiento y operación**, facilitando la búsqueda, consulta y aprovechamiento de las herramientas de IA disponibles en la organización.

---

## 📦 Estructura del repositorio

```
nucleo-ia/
├── backend/              # API Express + autenticación Google OAuth
│   ├── src/
│   │   ├── config/       # Conexión a MongoDB
│   │   ├── controllers/  # Lógica de negocio por módulo
│   │   ├── middleware/   # Autenticación, errores
│   │   ├── models/       # Esquemas Mongoose
│   │   ├── routes/       # Endpoints REST protegidos
│   │   └── utils/
│   ├── .env.example
│   └── package.json
├── frontend/             # Next.js (React) interfaz principal
│   ├── components/
│   ├── lib/              # Cliente HTTP
│   ├── pages/            # Dashboard y vistas por módulo
│   ├── styles/           # CSS Modules
│   └── package.json
├── docs/
│   └── architecture/
│       └── overview.md   # Resumen técnico inicial
└── README.md
```

---

## 🚀 Puesta en marcha (desarrollo)

1. **Backend**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
   Variables clave:
   - `MONGO_URI`: cadena de conexión a MongoDB.
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: credenciales OAuth (restricción dominio `@tropica.me`).
   - `CLIENT_URL`: URL del frontend autorizada.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Variables opcionales:
   - `NEXT_PUBLIC_API_URL`: URL base del backend (default `http://localhost:4000/api`).
   - `NEXT_PUBLIC_GOOGLE_AUTH_URL`: endpoint de login (default `http://localhost:4000/api/auth/google`).

3. Accede a `http://localhost:3000` y autentícate con tu cuenta corporativa.

---

## 🧩 Módulos principales

- **Dashboard**: Resumen de licencias por vencer, sesiones próximas y últimos tutoriales.
- **Licencias y softwares**: Inventario con filtros y responsables.
- **Tutoriales y documentación**: Guías, PDFs, videos y enlaces categorizados.
- **Sesiones UFO**: Agenda, grabaciones y materiales de Universe of Future Opportunities.
- **Repositorio de proyectos**: Casos de uso, plantillas, repositorios y estado de cada iniciativa.

Cada módulo cuenta con endpoints REST (`/api/...`) y vistas dedicadas en el frontend.

---

## 🔐 Autenticación y roles

- Login mediante Google OAuth 2.0, limitado al dominio `@tropica.me`.
- Roles predefinidos:
  - `admin`: gestiona usuarios, licencias y recursos.
  - `editor`: crea/actualiza contenidos.
  - `viewer`: acceso de lectura.
- Middleware `ensureAuthenticated` y `authorizeRoles` protegen cada ruta del backend.

> Próximos pasos: persistir usuarios y roles en base de datos para gestión avanzada.

---

## 🗺️ Roadmap sugerido

1. **MVP actual**
   - Autenticación Google + dominio corporativo.
   - API modular con modelos para licencias, tutoriales, sesiones y proyectos.
   - UI Next.js con dashboard y vistas base.

2. **Iteraciones siguientes**
   - Buscador global con tags y filtros combinados.
   - Panel de administración (CRUD visual, roles avanzados).
   - Integración con GitHub para sincronizar repositorios.
   - Notificaciones de licencias próximas a expirar (email/Slack).
   - Integración de almacenamiento (Drive/S3) para archivos pesados.

---

## 🤝 Cómo contribuir

1. Crea una rama descriptiva:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
2. Implementa los cambios con pruebas y linters.
3. Ejecuta `npm run lint` en backend/frontend según corresponda.
4. Abre un Pull Request detallando alcance y pruebas.

---

## 📄 Licencia

Proyecto interno de Trópica. Uso restringido a colaboradores autorizados.
