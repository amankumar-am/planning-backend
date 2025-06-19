// src/config/swagger.ts

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Planning Backend API',
            version: '1.0.0',
            description: 'Comprehensive API documentation for the Planning Management System',
            contact: {
                name: 'API Support',
                email: 'support@planning.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token obtained from login endpoint'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'User ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Full name of the user'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        username: {
                            type: 'string',
                            description: 'Username for login'
                        },
                        firstName: {
                            type: 'string',
                            description: 'First name'
                        },
                        lastName: {
                            type: 'string',
                            description: 'Last name'
                        },
                        isActive: {
                            type: 'boolean',
                            description: 'Whether the user is active'
                        },
                        lastLogin: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last login timestamp'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'User creation timestamp'
                        },
                        roles: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/UserRole'
                            }
                        }
                    }
                },
                UserRole: {
                    type: 'object',
                    properties: {
                        roleId: {
                            type: 'integer',
                            description: 'Role ID'
                        },
                        roleName: {
                            type: 'string',
                            description: 'Role name'
                        },
                        roleCode: {
                            type: 'string',
                            description: 'Role code'
                        },
                        assignmentType: {
                            type: 'string',
                            enum: ['direct', 'inherited'],
                            description: 'How the role was assigned'
                        },
                        source: {
                            type: 'string',
                            description: 'Source of role assignment'
                        }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email or username'
                        },
                        password: {
                            type: 'string',
                            description: 'User password'
                        }
                    }
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                            description: 'JWT authentication token'
                        },
                        user: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'object',
                            properties: {
                                code: {
                                    type: 'string',
                                    description: 'Error code'
                                },
                                message: {
                                    type: 'string',
                                    description: 'Error message'
                                },
                                status: {
                                    type: 'integer',
                                    description: 'HTTP status code'
                                }
                            }
                        }
                    }
                },
                BaseEntity: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique identifier'
                        },
                        isActive: {
                            type: 'boolean',
                            description: 'Whether the entity is active',
                            default: true
                        },
                        createdBy: {
                            type: 'string',
                            description: 'User who created this entity'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        modifiedBy: {
                            type: 'string',
                            description: 'User who last modified this entity'
                        },
                        modifiedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last modification timestamp'
                        }
                    }
                },
                FilterOption: {
                    type: 'object',
                    required: ['field', 'operator'],
                    properties: {
                        field: {
                            type: 'string',
                            description: 'Field name to filter on',
                            example: 'nameEn'
                        },
                        operator: {
                            type: 'string',
                            enum: ['eq', 'ne', 'like', 'in', 'gte', 'lte', 'isNull', 'isNotNull'],
                            description: 'Filter operator',
                            example: 'like'
                        },
                        value: {
                            oneOf: [
                                { type: 'string' },
                                { type: 'number' },
                                { type: 'boolean' },
                                { type: 'array', items: { type: 'string' } }
                            ],
                            description: 'Value to filter by (not required for isNull/isNotNull operators)',
                            example: 'Gujarat'
                        }
                    }
                },
                QueryRequest: {
                    type: 'object',
                    properties: {
                        page: {
                            type: 'integer',
                            minimum: 1,
                            description: 'Page number for pagination',
                            example: 1
                        },
                        limit: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 100,
                            description: 'Number of items per page',
                            example: 10
                        },
                        sortBy: {
                            type: 'string',
                            description: 'Field to sort by',
                            example: 'nameEn'
                        },
                        sortOrder: {
                            type: 'string',
                            enum: ['ASC', 'DESC'],
                            description: 'Sort order',
                            example: 'ASC'
                        },
                        search: {
                            type: 'string',
                            description: 'Search term for text fields',
                            example: 'Gujarat'
                        },
                        filters: {
                            type: 'string',
                            description: 'JSON string of filter objects',
                            example: '[{"field":"isActive","operator":"eq","value":true}]'
                        }
                    }
                },
                PaginatedResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Data fetched successfully'
                        },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object'
                            }
                        },
                        pagination: {
                            type: 'object',
                            properties: {
                                page: {
                                    type: 'integer',
                                    example: 1
                                },
                                limit: {
                                    type: 'integer',
                                    example: 10
                                },
                                total: {
                                    type: 'integer',
                                    example: 100
                                },
                                totalPages: {
                                    type: 'integer',
                                    example: 10
                                },
                                hasNext: {
                                    type: 'boolean',
                                    example: true
                                },
                                hasPrev: {
                                    type: 'boolean',
                                    example: false
                                }
                            }
                        }
                    }
                },
                ValidationResponse: {
                    type: 'object',
                    properties: {
                        parsed: {
                            $ref: '#/components/schemas/QueryRequest'
                        },
                        isValid: {
                            type: 'boolean',
                            example: true
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: []
                        }
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Operation completed successfully'
                        },
                        data: {
                            type: 'object'
                        }
                    }
                }
            }
        }
    },
    apis: [
        './src/modules/auth/*.ts',
        './src/modules/**/*.route.ts',
        './src/modules/**/*.controller.ts',
        './src/routes.ts'
    ]
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
    // Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Planning API Documentation'
    }));

    // Docs in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });

    console.log('📚 Swagger documentation available at http://localhost:3000/api-docs');
};

export default specs; 