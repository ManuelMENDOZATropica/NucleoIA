# Núcleo IA - Arquitectura inicial

## Objetivos del MVP
- Autenticación restringida a dominios `@tropica.me` usando Google OAuth.
- Dashboard central con visión rápida de licencias, tutoriales, sesiones UFO y proyectos.
- CRUD básico de los módulos principales.
- Base escalable para incorporar notificaciones, tags globales y panel de administración.

## Componentes
- **Frontend (Next.js)**: UI SSR-ready, consume API protegida, integra login y vistas por módulo.
- **Backend (Express)**: API REST modular con control de acceso y conexión a MongoDB.
- **Base de datos (MongoDB)**: Modelado flexible para documentos heterogéneos.

## Flujo de autenticación
1. Usuario visita `/login` en el frontend.
2. Frontend redirige a `/api/auth/google` del backend.
3. Google OAuth valida el dominio `tropica.me` y devuelve al callback.
4. Se crea la sesión y se redirige a `/dashboard` (Next.js).

## Rutas principales API
- `GET /api/resources` – Listado filtrado por tags.
- `GET /api/licenses` – Permite filtros y resalta expiraciones.
- `GET /api/tutorials` – Soporta formatos mixtos.
- `GET /api/ufo-sessions` – Incluye sesiones próximas.
- `GET /api/projects` – Integración con repositorios externos.

Todas las rutas protegidas usan `ensureAuthenticated` y controles de rol.

## Próximos pasos sugeridos
- Implementar persistencia de usuarios y roles en base de datos.
- Añadir subir archivos (Drive/S3) y gestión de metadatos.
- Construir panel de administración y buscador global.
- Configurar notificaciones automatizadas para licencias próximas a expirar.
