# Luntia - Dashboard

Sistema de gestión para ONGs que permite administrar voluntarios, turnos, socios, donaciones y actividades. Desarrollado con arquitectura limpia y monorepo.

## 📋 Tabla de Contenidos

- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Testing](#-testing)
- [Arquitectura](#-arquitectura)
- [Gestión de Inconsistencias de Datos](#-gestión-de-inconsistencias-de-datos)
- [API Endpoints](#-api-endpoints)
- [Próximos Pasos](#-próximos-pasos)

## 🗂 Estructura del Proyecto

```
luntia/
├── backend/                    # API REST con Express
│   └── src/
│       ├── application/        # Casos de uso
│       │   ├── GetMetrics.ts
│       │   ├── GetTurnos.ts
│       │   └── GetVoluntarios.ts
│       ├── domain/             # Entidades y contratos
│       │   ├── entities/       # Modelos de dominio
│       │   │   ├── Voluntario.ts
│       │   │   ├── Turno.ts
│       │   │   ├── Socio.ts
│       │   │   ├── Donacion.ts
│       │   │   └── Actividad.ts
│       │   └── repositories/   # Interfaces de repositorios
│       │       └── IDataRepository.ts
│       └── infrastructure/     # Implementaciones
│           ├── http/           # Servidor y rutas
│           │   ├── server.ts
│           │   └── routes/
│           ├── parsers/        # Parser y normalizadores
│           │   └── CsvParser.ts
│           └── repositories/   # Implementación de repositorios
│               └── CsvDataRepository.ts
│
├── frontend/                   # SPA con React
│   └── src/
│       ├── application/        # Hooks de negocio
│       │   ├── useMetrics.ts
│       │   ├── useTurnos.ts
│       │   ├── useVoluntarios.ts
│       │   └── useVoluntariosData.ts
│       ├── domain/             # Tipos de dominio
│       │   └── types.ts
│       ├── infrastructure/     # Cliente API
│       │   └── api/
│       │       └── luntiaApi.ts
│       └── presentation/       # Componentes React
│           ├── components/     # Componentes reutilizables
│           │   ├── Chart.tsx
│           │   ├── KpiCard.tsx
│           │   ├── Loading.tsx
│           │   ├── Error.tsx
│           │   └── Navbar.tsx
│           └── pages/          # Páginas
│               ├── Home.tsx
│               ├── Dashboard.tsx
│               ├── Voluntarios.tsx
│               ├── Turnos.tsx
│               └── Socios.tsx
│
└── data/                       # Archivos CSV
    ├── voluntarios.csv
    ├── turnos.csv
    ├── socios.csv
    ├── donaciones.csv
    └── actividades.csv
```

## 🛠 Tecnologías

### Backend
- **Node.js** con **TypeScript**
- **Express** - Framework web
- **csv-parse** - Parser de archivos CSV
- **tsx** - Ejecución de TypeScript en desarrollo
- **CORS** - Control de acceso entre orígenes
- **Vitest** - Framework de testing unitario

### Frontend
- **React 18** con **TypeScript**
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Recharts** - Gráficos y visualizaciones

### Monorepo
- **npm workspaces** - Gestión de dependencias
- **concurrently** - Ejecución paralela de scripts

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js >= 18
- npm >= 9

### Instalación

```bash
# Clonar el repositorio
git clone <url-repositorio>
cd luntia

# Instalar dependencias de todo el monorepo
npm install
```

### Ejecución en Desarrollo

```bash
# Ejecutar backend y frontend simultáneamente
npm run dev

# O ejecutar cada uno por separado:
npm run dev:backend   # Backend en http://localhost:3000
npm run dev:frontend  # Frontend en http://localhost:5173
```

## 🧪 Testing

El proyecto incluye **tests unitarios** para las funcionalidades críticas del backend, asegurando la robustez de la lógica de normalización de datos.

### Tests Implementados

#### CsvParser Unit Tests ✅

Cobertura completa de la clase `CsvParser` que maneja todas las inconsistencias de los archivos CSV.

**Ubicación**: `backend/src/infrastructure/parsers/CsvParser.test.ts`

**Resultados**: 25 tests pasando (100%)

**Cobertura por función:**

1. **parseDate()** - 5 tests
   - ✅ Formato ISO (YYYY-MM-DD)
   - ✅ Formato europeo (DD/MM/YYYY)
   - ✅ Formato americano (YYYY/MM/DD)
   - ✅ Strings vacíos → `null`
   - ✅ Formatos no soportados → `null`

2. **parseBoolean()** - 6 tests
   - ✅ "true" / "TRUE" → `true` (case insensitive)
   - ✅ "false" / "FALSE" → `false`
   - ✅ Valores vacíos e inválidos → `false`

3. **parseNumber()** - 7 tests
   - ✅ Números positivos válidos
   - ✅ Números negativos (permitidos/no permitidos)
   - ✅ Valores vacíos → `0`
   - ✅ "N/A" / "NaN" → `0`
   - ✅ Strings inválidos → `0`

4. **parseString()** - 4 tests
   - ✅ Trimming de espacios
   - ✅ Valores por defecto
   - ✅ Preservación de contenido

5. **Integration Tests** - 3 tests
   - ✅ Manejo de formatos mixtos (como en CSV real)
   - ✅ Horas inválidas de `turnos.csv`
   - ✅ Booleanos de `voluntarios.csv`

### Ejecutar Tests

```bash
# Ejecutar todos los tests una vez
cd backend
npm test

# Ejecutar tests en modo watch (rerun automático)
npm run test:watch
```

### Ejemplo de Salida

```
✓ src/infrastructure/parsers/CsvParser.test.ts (25 tests) 8ms
  ✓ CsvParser > parseDate > should parse ISO format (YYYY-MM-DD)
  ✓ CsvParser > parseBoolean > should parse "true" as true
  ✓ CsvParser > parseNumber > should return 0 for "N/A"
  ...

Test Files  1 passed (1)
Tests       25 passed (25)
Duration    495ms
```

### Por qué estos tests son importantes

Los tests del `CsvParser` son críticos porque:
- 🛡️ **Previenen regresiones**: Garantizan que las normalizaciones funcionan correctamente
- 📊 **Validan edge cases**: Cubren todos los casos de datos inválidos encontrados en los CSV
- 🔄 **Facilitan refactoring**: Permiten modificar el código con confianza
- 📋 **Documentan comportamiento**: Los tests sirven como documentación ejecutable

## 🏗 Arquitectura

El proyecto sigue los principios de **Clean Architecture** (Arquitectura Limpia):

### Backend

1. **Domain** (Núcleo de negocio)
   - Entidades: Modelos de datos inmutables
   - Interfaces de repositorios: Contratos sin implementación

2. **Application** (Casos de uso)
   - Lógica de negocio independiente de frameworks
   - Coordinación entre repositorios

3. **Infrastructure** (Implementaciones)
   - Parsers: Normalización y validación de datos
   - Repositorios: Acceso a datos de los archivos CSV
   - HTTP: Servidor Express y rutas

### Frontend

1. **Domain** (Tipos)
   - Interfaces TypeScript compartidas

2. **Application** (Hooks)
   - Lógica de negocio y estado
   - Gestión de llamadas a la API

3. **Infrastructure** (API Client)
   - Cliente HTTP para comunicación con backend

4. **Presentation** (UI)
   - Componentes React
   - Páginas y navegación

### Ventajas de esta arquitectura:
- ✅ **Testeable**: Lógica de negocio independiente de frameworks
- ✅ **Mantenible**: Separación clara de responsabilidades
- ✅ **Escalable**: Fácil agregar nuevas fuentes de datos
- ✅ **Flexible**: Cambiar tecnologías sin afectar el dominio

## 🔧 Gestión de Inconsistencias de Datos

Los archivos CSV contienen datos con inconsistencias que se manejan de forma automática

### 1. Formatos de Fecha Inconsistentes

**Problema**: Los CSV mezclan diferentes formatos de fecha.

**Ejemplos en los datos**:
```csv
# voluntarios.csv
alta
2024-02-10        ← Formato ISO (YYYY-MM-DD)
03/04/2024        ← Formato europeo (DD/MM/YYYY)
2023-11-20        ← Formato ISO
2025/01/05        ← Formato americano (YYYY/MM/DD)

# turnos.csv
fecha
2025-08-01        ← Formato ISO
02/08/2025        ← Formato europeo
```

**Solución implementada** (`CsvParser.parseDate()`):
```typescript
// Detecta automáticamente 3 formatos:
- YYYY-MM-DD  → new Date('2024-02-10')
- DD/MM/YYYY  → new Date('2024-04-03')  // Convierte 03/04/2024
- YYYY/MM/DD  → new Date('2025-01-05')
```

### 2. Valores Numéricos Inválidos

**Problema**: Horas negativas, importes inválidos, valores "N/A".

**Ejemplos**:
```csv
horas
3
-2          ← Horas negativas (imposible)
N/A         ← No es número
```

**Solución** (`CsvParser.parseNumber()`):
- Horas/importes negativos → `0`
- "N/A", "NaN", vacío → `0`
- Permite negativos solo cuando tiene sentido (ej: ajustes contables)

### 3. Socios Duplicados

**Problema**: Mismo socio registrado múltiples veces.

**Ejemplo**:
```csv
id,nombre,alta,entidad
s1,Juan Pérez,2024-01-01,Asociación A
s2,Juan Pérez,2024-01-01,Asociación A  ← Duplicado exacto
```

**Solución** (`CsvDataRepository.getSocios()`):
```typescript
// Detecta duplicados por: nombre + fecha de alta
// Solo mantiene la primera ocurrencia
const key = `${socio.nombre}-${socio.alta.toISOString()}`;
if (seen.has(key)) return false; // Filtra duplicado
```

### 4. Referencias Inválidas (IDs Huérfanos)

**Problema**: Turnos que referencian voluntarios inexistentes.

**Ejemplo**:
```csv
# turnos.csv
voluntario_id
v1          ← Existe en voluntarios.csv ✓
v99         ← NO existe en voluntarios.csv ✗
```

**Solución** (`CsvDataRepository.getTurnos()`):
```typescript
// Carga todos los voluntarios primero
const voluntariosIds = new Set(voluntarios.map(v => v.id));

// Filtra turnos con IDs inválidos
.filter(turno => voluntariosIds.has(turno.voluntarioId))
```

### 5. Valores Booleanos Inconsistentes

**Problema**: Diferentes representaciones de verdadero/falso.

**Ejemplos**:
```csv
activo
true
TRUE
false
FALSE
1           ← No soportado por defecto
```

**Solución** (`CsvParser.parseBoolean()`):
```typescript
// Normaliza a minúsculas y compara
value.trim().toLowerCase() === 'true'
```

### 6. Strings Vacíos y Espacios

**Problema**: Valores con espacios, vacíos o nulos.

**Solución** (`CsvParser.parseString()`):
```typescript
// Limpia espacios y provee valor por defecto
if (!value || value.trim() === '') return defaultValue;
return value.trim();
```

### Resumen de Estrategias

| Inconsistencia | Estrategia | Ubicación |
|----------------|-----------|-----------|
| Formatos de fecha | Detección por regex + conversión | `CsvParser.parseDate()` |
| Números inválidos | Valores por defecto (0) | `CsvParser.parseNumber()` |
| Duplicados | Deduplicación por clave compuesta | `CsvDataRepository.getSocios()` |
| IDs huérfanos | Filtrado por existencia | `CsvDataRepository.getTurnos()` |
| Booleanos | Normalización lowercase | `CsvParser.parseBoolean()` |
| Strings vacíos | Trim + defaults | `CsvParser.parseString()` |

Estas validaciones aseguran que la API siempre devuelve datos coherentes y la UI nunca se rompe por datos inválidos.

## 📡 API Endpoints

Base URL: `http://localhost:3000/api`

### Voluntarios
```
GET /data/voluntarios
Response: Voluntario[]
```

### Turnos
```
GET /data/turnos
Response: Turno[]
```

### Socios
```
GET /data/socios
Response: Socio[]
```

### Donaciones
```
GET /data/donaciones
Response: Donacion[]
```

### Actividades
```
GET /data/actividades
Response: Actividad[]
```

### Métricas
```
GET /metrics/entidad/:entidad
Response: {
  totalVoluntarios: number
  totalHoras: number
  voluntariosActivos: number
  voluntariosPorRol: { rol: string, count: number }[]
}
```

## 🎯 Próximos Pasos

### Funcionalidades

- [ ] **Autenticación y Autorización**
  - Login para diferentes entidades
  - Roles (admin, coordinador, voluntario)
  - JWT tokens

- [ ] **CRUD Completo**
  - Crear/editar/eliminar voluntarios
  - Registrar turnos desde la UI
  - Gestión de socios y donaciones

- [ ] **Dashboards Avanzados**
  - Comparativa entre entidades
  - Evolución temporal de horas
  - Ranking de voluntarios más activos
  - Mapa de calor de actividades

- [ ] **Exportación de Datos**
  - Generar reportes en PDF
  - Exportar a Excel
  - Gráficos descargables

- [ ] **Notificaciones**
  - Email a voluntarios sobre turnos
  - Recordatorios de actividades
  - Alertas de objetivos cumplidos

- [ ] **Búsqueda y Filtros**
  - Filtrar por entidad, fecha, actividad
  - Búsqueda de voluntarios
  - Ordenamiento de tablas

### Mejoras Técnicas

- [x] **Testing** (Parcialmente implementado)
  - ✅ Unit tests del CsvParser (Vitest) - 25 tests
  - [ ] Unit tests de casos de uso (GetMetrics, GetVoluntarios)
  - [ ] Integration tests de endpoints
  - [ ] Frontend tests (React Testing Library)
  - [ ] E2E tests (Playwright)

- [ ] **Base de Datos**
  - Migrar de CSV a PostgreSQL/MongoDB
  - Implementar ORM (Prisma/TypeORM)
  - Migrations y seeders

- [ ] **Validación**
  - Zod/Yup para validación de esquemas
  - Validación en backend y frontend

- [ ] **Performance**
  - Cache con Redis
  - Paginación de datos
  - Lazy loading de imágenes

- [ ] **DevOps**
  - Docker y Docker Compose
  - CI/CD (GitHub Actions)
  - Deploy en AWS/Vercel/Railway

- [ ] **Calidad de Código**
  - ESLint + Prettier
  - Husky para pre-commit hooks
  - SonarQube para análisis

- [ ] **Documentación**
  - Swagger/OpenAPI para la API
  - Storybook para componentes
  - JSDoc en funciones críticas

### Refactoring

- [ ] **Error Handling**
  - Middleware de errores global
  - Códigos de error estandarizados
  - Logging estructurado (Winston/Pino)

- [ ] **Configuración**
  - Variables de entorno (.env)
  - Configuración por entorno (dev/prod)

- [ ] **Accesibilidad**
  - ARIA labels
  - Navegación por teclado
  - Modo oscuro
