# Planning Backend API

A comprehensive Node.js backend application built with TypeScript, Express, and TypeORM for planning and administration management.

## 🚀 Features

- **Complete CRUD Operations** for all planning entities
- **Advanced Query Capabilities** with filtering, sorting, and pagination
- **Relational Data Management** with automated joins
- **Authentication & Authorization** with JWT
- **Type-Safe Development** with TypeScript
- **Database Agnostic** with TypeORM
- **Comprehensive Error Handling** with validation
- **Production Ready** with robust architecture

## 📋 Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Advanced Querying](#advanced-querying)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

## 🛠 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd planning-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

```bash
cp .env.example .env
# Configure your database and JWT settings
```

4. **Database Setup**

```bash
npm run migration:run
```

5. **Start the application**

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## 🌐 API Endpoints

### Core Entities

All entities support complete CRUD operations with advanced querying capabilities:

| Module                 | Base Endpoint       | Description                               | Custom Routes                                                                          |
| ---------------------- | ------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| **Users**              | `/api/users`        | User management and authentication        | login, register, refresh-token, forgot-password                                        |
| **Departments**        | `/api/departments`  | Government departments                    | dashboard/global/total-departments                                                     |
| **States**             | `/api/states`       | State-level geography                     | -                                                                                      |
| **Districts**          | `/api/districts`    | District-level geography                  | -                                                                                      |
| **Prants**             | `/api/prants`       | Prant-level geography                     | -                                                                                      |
| **ACs**                | `/api/acs`          | Assembly constituencies                   | district/:districtId, dashboard/global/district/:districtId/total-acs                  |
| **Talukas**            | `/api/talukas`      | Taluka-level geography                    | district/:districtId, dashboard/global/district/:districtId/total-talukas              |
| **Villages**           | `/api/gpVillages`   | Village-level geography                   | district/:districtId, taluka/:talukaId                                                 |
| **Offices**            | `/api/offices`      | Office management                         | -                                                                                      |
| **Designations**       | `/api/designations` | Job designations                          | department/:departmentId, dashboard/global/department/:departmentId/total-designations |
| **Employment Types**   | `/api/empTypes`     | Employment classifications                | -                                                                                      |
| **Office Levels**      | `/api/offLevels`    | Office hierarchy levels                   | -                                                                                      |
| **Officer Classes**    | `/api/offClasses`   | Officer classifications                   | -                                                                                      |
| **MP/MLA**             | `/api/mpmlas`       | Member of Parliament/Legislative Assembly | -                                                                                      |
| **Sectors**            | `/api/sectors`      | Planning sectors                          | dashboard/global/total-sectors                                                         |
| **Sub-Sectors**        | `/api/subSectors`   | Sector subdivisions                       | sector/:sectorId                                                                       |
| **Funds**              | `/api/funds`        | Funding sources                           | dashboard/global/total-funds                                                           |
| **Financial Years**    | `/api/fy`           | Financial year management                 | -                                                                                      |
| **Beneficiary Groups** | `/api/bg`           | Beneficiary classifications               | -                                                                                      |
| **Dashboard**          | `/api/ps1`          | Planning stage 1 dashboard                | global/total-records, available-financial-years, etc.                                  |
| **PS1 Forms**          | `/api/ps1Route`     | Planning stage 1 forms                    | -                                                                                      |

### Standard CRUD Operations

✅ **ALL endpoints now support complete CRUD operations:**

```http
GET    /api/{entity}           # List all
GET    /api/{entity}/query     # Advanced querying with filters/sorting
GET    /api/{entity}/:id       # Get by ID
POST   /api/{entity}           # Create new
PUT    /api/{entity}/:id       # Update existing
DELETE /api/{entity}/:id       # Delete
```

### Validation & Debug Routes

```http
GET    /api/users/validate-query    # Debug endpoint for query validation
```

## 🔍 Advanced Querying

### Enhanced Query Endpoints

All entities now support advanced querying with `/query` endpoints:

```http
GET /api/users/query
GET /api/departments/query
GET /api/offices/query
# ... and all other entities
```

### Query Parameters

#### Pagination

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

#### Sorting

- `sortBy` (string): Field to sort by
- `sortOrder` (string): 'ASC' or 'DESC' (default: 'ASC')

#### Search

- `search` (string): Text search across configurable fields

#### Filtering

- `filters` (JSON array): Complex filter objects

### Filter Structure

```json
{
  "field": "fieldName",
  "operator": "eq|ne|like|in|gte|lte|isNull|isNotNull",
  "value": "filterValue"
}
```

### Filter Operators

| Operator    | Description                 | Example                                                       |
| ----------- | --------------------------- | ------------------------------------------------------------- |
| `eq`        | Equal to                    | `{"field":"isActive","operator":"eq","value":true}`           |
| `ne`        | Not equal to                | `{"field":"status","operator":"ne","value":"deleted"}`        |
| `like`      | Contains (case-insensitive) | `{"field":"name","operator":"like","value":"admin"}`          |
| `in`        | Value in array              | `{"field":"departmentId","operator":"in","value":[1,2,3]}`    |
| `gte`       | Greater than or equal       | `{"field":"createdAt","operator":"gte","value":"2024-01-01"}` |
| `lte`       | Less than or equal          | `{"field":"createdAt","operator":"lte","value":"2024-12-31"}` |
| `isNull`    | Field is null               | `{"field":"deletedAt","operator":"isNull"}`                   |
| `isNotNull` | Field is not null           | `{"field":"approvedAt","operator":"isNotNull"}`               |

## 📝 Examples

### Standard CRUD Examples

```bash
# Get all departments
GET /api/departments

# Get specific department
GET /api/departments/1

# Create new department
POST /api/departments
{
  "name": "IT Department",
  "nameEn": "IT Department",
  "nameGu": "આઈટી વિભાગ",
  "code": "IT001",
  "isActive": true
}

# Update department
PUT /api/departments/1
{
  "name": "Information Technology Department"
}

# Delete department
DELETE /api/departments/1
```

### Advanced Query Examples

```bash
# Pagination
GET /api/users/query?page=2&limit=20

# Sorting
GET /api/departments/query?sortBy=name&sortOrder=DESC

# Search
GET /api/offices/query?search=mumbai

# Single Filter
GET /api/users/query?filters=[{"field":"isActive","operator":"eq","value":true}]

# Multiple Filters
GET /api/users/query?filters=[
  {"field":"isActive","operator":"eq","value":true},
  {"field":"department.id","operator":"eq","value":1},
  {"field":"createdAt","operator":"gte","value":"2024-01-01"}
]

# Complex Query
GET /api/offices/query?page=1&limit=10&sortBy=createdAt&sortOrder=DESC&search=admin&filters=[
  {"field":"department.id","operator":"in","value":[1,2,3]},
  {"field":"isActive","operator":"eq","value":true}
]
```

### Relation-based Filtering

```bash
# Filter by related entity
GET /api/users/query?filters=[{"field":"department.name","operator":"like","value":"IT"}]
GET /api/offices/query?filters=[{"field":"state.code","operator":"eq","value":"GJ"}]
GET /api/talukas/query?filters=[{"field":"district.name","operator":"like","value":"Ahmedabad"}]
```

### Response Format

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Example Entity",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "department": {
        "id": 1,
        "name": "IT Department"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔐 Authentication

### User Registration & Login

```bash
# Register
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

# Login
POST /api/users/login
{
  "email": "john@example.com",
  "password": "securepassword"
}

# Response
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Token Management

```bash
# Refresh Token
POST /api/users/refresh-token
{
  "refreshToken": "refresh_token_here"
}

# Password Reset
POST /api/users/forgot-password
{
  "email": "john@example.com"
}

POST /api/users/reset-password
{
  "token": "reset_token",
  "newPassword": "newpassword"
}
```

## 🗄 Database Schema

### Key Relations

- **Users** → Department, Office, Designation, Employment Type, Officer Class
- **Offices** → Department, Office Level, State, District, Prant, Taluka, Village
- **Geographic Hierarchy**: State → District → Prant → Taluka → Village
- **Planning Hierarchy**: Sector → Sub-Sector

### Entity Features

All entities include:

- `id` (Primary Key)
- `name`, `nameEn`, `nameGu` (Multi-language support)
- `code` (Unique identifier)
- `isActive` (Soft delete flag)
- `createdAt`, `modifiedAt` (Timestamps)
- `createdBy`, `modifiedBy` (Audit trail)

## 🔧 Troubleshooting

### Common Errors

#### 1. "Invalid filter parameters" Error

**Cause**: Malformed filter structure
**Solution**: Ensure proper JSON format:

```json
// ❌ WRONG
[{"field":"0","operator":"eq","value":{"nested":"object"}}]

// ✅ CORRECT
[{"field":"isActive","operator":"eq","value":true}]
```

#### 2. "SQL syntax error"

**Cause**: Invalid field names or operators
**Solution**: Use valid field names and operators:

```json
// ❌ WRONG - Numeric field name
{"field":"0","operator":"eq","value":"test"}

// ✅ CORRECT
{"field":"isActive","operator":"eq","value":true}
```

#### 3. "Method not found" Errors

**Cause**: Missing CRUD routes
**Solution**: All modules now have complete CRUD operations restored

### Debug Endpoint

Use the validation endpoint to test your queries:

```bash
GET /api/users/validate-query?filters=[{"field":"isActive","operator":"eq","value":true}]
```

### Validation Rules

1. **Field Names**: Must contain only letters, numbers, underscores, and dots
2. **Operators**: Must be one of the supported operators
3. **Values**: Cannot be objects (except arrays for `in` operator)

## 🛠 Development

### Project Structure

```
src/
├── core/                 # Base classes and utilities
│   ├── base.controller.ts
│   ├── base.service.ts
│   ├── base.repository.ts
│   ├── base.type.ts
│   └── query.helper.ts
├── modules/              # Feature modules
│   ├── auth/
│   ├── department/
│   ├── state/
│   └── ...
├── config/               # Configuration
└── api/                  # API models and schemas
```

### Adding New Entities

1. **Create Module Structure**:

```typescript
// entity.entity.ts
@Entity("table_name")
export class MyEntity extends BaseEntity {
  // entity definition
}

// entity.repository.ts
export class MyRepository extends BaseRepository<MyEntity> {
  constructor() {
    super(MyEntity);
  }
}

// entity.service.ts
export class MyService extends BaseService<MyEntity> {
  // service methods
}

// entity.controller.ts
export class MyController extends BaseController<MyEntity> {
  constructor(service: MyService) {
    super(
      service,
      MySchema,
      ["relation1", "relation2"], // relations
      ["field1", "field2"] // searchable fields
    );
  }

  async listWithQuery(req: Request, res: Response): Promise<void> {
    await this.getAllWithQuery(req, res);
  }
}
```

2. **Add Routes**:

```typescript
// entity.route.ts
// Standard CRUD operations
router.get("/", controller.list.bind(controller));
router.get("/query", controller.listWithQuery.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
```

### Using Query Helper

```typescript
import { QueryHelper, SortOrder } from "./core/query.helper";

// Build filters programmatically
const filters = [
  QueryHelper.equals("isActive", true),
  QueryHelper.contains("name", "admin"),
  QueryHelper.in("departmentId", [1, 2, 3]),
];

// Build query parameters
const params = QueryHelper.buildQueryParams({
  page: 1,
  limit: 20,
  sortBy: "createdAt",
  sortOrder: SortOrder.DESC,
  filters: filters,
});
```

## 🚀 Production Deployment

### Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=planning_db

# JWT
JWT_SECRET=your-secret-key

# Server
PORT=3000
NODE_ENV=production
```

### Performance Tips

1. **Use Pagination**: Always limit results with `page` and `limit`
2. **Index Database Fields**: Add indexes for frequently filtered fields
3. **Limit Relations**: Only include necessary relations
4. **Cache Results**: Implement caching for frequently accessed data

## 📊 API Status

### Implementation Status

- ✅ **21/21 Endpoints** with enhanced query capabilities
- ✅ **Complete CRUD Operations** restored on all entities
- ✅ **100% Backward Compatibility** maintained
- ✅ **Comprehensive Error Handling** implemented
- ✅ **Production Ready** with validation and security

### Supported Operations per Entity

✅ **GET** `/` (List all)
✅ **GET** `/query` (Advanced querying)
✅ **GET** `/:id` (Get by ID)
✅ **POST** `/` (Create)
✅ **PUT** `/:id` (Update)
✅ **DELETE** `/:id` (Delete)

### Supported Entities

✅ Users, Departments, States, Districts, Prants, ACs, Talukas, Villages, Offices, Designations, Employment Types, Office Levels, Officer Classes, MP/MLA, Sectors, Sub-Sectors, Funds, Financial Years, Beneficiary Groups, Dashboard, PS1 Forms

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Use the debug endpoints (`/validate-query`)
3. Review the examples in this documentation
4. Check console logs for detailed error messages

---

**Built with ❤️ using TypeScript, Express, and TypeORM**
