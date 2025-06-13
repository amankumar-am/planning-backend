# API Query Guide: Filtering, Sorting, and Pagination

This guide explains how to use the enhanced query capabilities for filtering, sorting, and pagination in your API endpoints.

## Enhanced Endpoint

All endpoints that extend the `BaseController` now support an enhanced query endpoint:

```
GET /api/users/query
```

## Query Parameters

### Pagination

- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (default: 10)

### Sorting

- `sortBy` (string): Field to sort by
- `sortOrder` (string): Sort order - 'ASC' or 'DESC' (default: 'ASC')

### Search

- `search` (string): Search term to match against searchable fields

### Filters

- `filters` (JSON string): Array of filter objects

## Filter Object Structure

```json
{
  "field": "fieldName",
  "operator": "eq|like|in|gte|lte|ne|isNull|isNotNull",
  "value": "filterValue"
}
```

### Available Filter Operators

- `eq`: Equal to
- `ne`: Not equal to
- `like`: Contains (case-insensitive)
- `in`: Value is in array
- `gte`: Greater than or equal to
- `lte`: Less than or equal to
- `isNull`: Field is null
- `isNotNull`: Field is not null

## Example Usage

### Basic Pagination

```
GET /api/users/query?page=2&limit=20
```

### Sorting

```
GET /api/users/query?sortBy=username&sortOrder=DESC
```

### Search

```
GET /api/users/query?search=john
```

### Single Filter

```
GET /api/users/query?filters=[{"field":"isActive","operator":"eq","value":true}]
```

### Multiple Filters

```
GET /api/users/query?filters=[
  {"field":"isActive","operator":"eq","value":true},
  {"field":"username","operator":"like","value":"john"},
  {"field":"createdAt","operator":"gte","value":"2023-01-01"}
]
```

### Combined Query

```
GET /api/users/query?page=1&limit=10&sortBy=createdAt&sortOrder=DESC&search=admin&filters=[{"field":"isActive","operator":"eq","value":true}]
```

## Response Format

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": [...],
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

## User Endpoint Specific Features

### Searchable Fields

The user endpoint searches across the following fields:

- `username`
- `emailId`
- `firstName`
- `lastName`

### Available Relations

The user endpoint automatically includes these relations:

- `department`
- `office`
- `designation`
- `employmentType`
- `officerClass`

### Example Filters for Users

```javascript
// Filter by department
filters = [{ field: "department.id", operator: "eq", value: 1 }];

// Filter by active users created this year
filters = [
  { field: "isActive", operator: "eq", value: true },
  { field: "createdAt", operator: "gte", value: "2024-01-01" },
];

// Filter by multiple employment types
filters = [{ field: "employmentType.id", operator: "in", value: [1, 2, 3] }];
```

## Using the QueryHelper Utility

For easier query building, you can use the `QueryHelper` class:

```typescript
import { QueryHelper, SortOrder } from "./core/query.helper";

// Build filters
const filters = [
  QueryHelper.equals("isActive", true),
  QueryHelper.contains("username", "admin"),
  QueryHelper.greaterThanOrEqual("createdAt", "2024-01-01"),
];

// Build query parameters
const params = QueryHelper.buildQueryParams({
  page: 1,
  limit: 20,
  sortBy: "createdAt",
  sortOrder: SortOrder.DESC,
  search: "john",
  filters: filters,
});

// Use in API call
const url = `/api/users/query?${params.toString()}`;
```

## Extending to Other Endpoints

To add this functionality to other endpoints:

1. Update your controller to extend `BaseController` with relations and searchable fields:

```typescript
export class MyController extends BaseController<MyEntity> {
  constructor(private readonly myService: MyService) {
    super(
      myService,
      MySchema,
      ["relation1", "relation2"], // relations to include
      ["field1", "field2"] // searchable fields
    );
  }

  async listWithQuery(req: Request, res: Response): Promise<void> {
    await this.getAllWithQuery(req, res);
  }
}
```

2. Add the route:

```typescript
router.get("/query", controller.listWithQuery.bind(controller));
```

That's it! Your endpoint now supports full filtering, sorting, and pagination capabilities.
