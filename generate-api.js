// generate-api.js
const fs = require('fs');
const path = require('path');

// Get API name from command-line argument
const apiName = process.argv[2];
if (!apiName) {
  console.error('Please provide an API name.');
  process.exit(1);
}

// Convert API name to camelCase and PascalCase
const camelCase = apiName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
const snakeCase = apiName.toLowerCase().replace(/ /g, '_');

// Define module directory
const moduleDir = path.join(__dirname, 'src', 'modules', snakeCase);
if (fs.existsSync(moduleDir)) {
  console.error('Module already exists:', moduleDir);
  process.exit(1);
}

fs.mkdirSync(moduleDir, { recursive: true });

const templates = {
  [`${snakeCase}.entity.ts`]: `
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_${pascalCase}')
export class ${pascalCase}Entity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: '${pascalCase}_Id' })
  id!: number;

  @Column({ name: 'Name_En', length: 100 })
  nameEn!: string;

  @Column({ name: 'Name_Gu', length: 100, nullable: true })
  nameGu?: string;

  // Add more fields or relations as needed
}
`,

  [`${snakeCase}.type.ts`]: `
import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class Create${pascalCase}Dto extends BaseDtoFields {
  @IsString()
  nameEn!: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  // Add more fields or relation IDs as needed
}

export class Update${pascalCase}Dto implements Partial<Create${pascalCase}Dto> {
  @IsString()
  @IsOptional()
  nameEn?: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsString()
  modifiedBy!: string;

  @IsDate()
  modifiedAt!: Date;
}
`,

  [`${snakeCase}.repository.ts`]: `
import { ${pascalCase}Entity } from './${snakeCase}.entity';
import { BaseRepository } from '../../core/base.repository';

export class ${pascalCase}Repository extends BaseRepository<${pascalCase}Entity> {
  constructor() {
    super(${pascalCase}Entity);
  }

  async findAllWithRelations(relations: string[]): Promise<${pascalCase}Entity[]> {
    return this.repository.find({ relations });
  }
}
`,

  [`${snakeCase}.service.ts`]: `
import { BaseService } from '../../core/base.service';
import { ${pascalCase}Entity } from './${snakeCase}.entity';
import { ${pascalCase}Repository } from './${snakeCase}.repository';
import { Create${pascalCase}Dto, Update${pascalCase}Dto } from './${snakeCase}.type';

export class ${pascalCase}Service extends BaseService<${pascalCase}Entity> {
  constructor(private readonly ${camelCase}Repository: ${pascalCase}Repository) {
    super(${camelCase}Repository);
  }

  async create(dto: Create${pascalCase}Dto): Promise<${pascalCase}Entity> {
    return this.${camelCase}Repository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async findAllWithRelations(): Promise<${pascalCase}Entity[]> {
    return this.${camelCase}Repository.findAllWithRelations([]);
  }
}
`,

  [`${snakeCase}.controller.ts`]: `
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { ${pascalCase}Service } from './${snakeCase}.service';
import { ${pascalCase}Entity } from './${snakeCase}.entity';
import { BaseController } from '../../core/base.controller';
import { ${camelCase}Schema } from '../../api/models/schemas/${snakeCase}.schema';

export class ${pascalCase}Controller extends BaseController<${pascalCase}Entity> {
  constructor(private readonly ${camelCase}Service: ${pascalCase}Service) {
    super(${camelCase}Service, ${camelCase}Schema);
  }

  // Override the list endpoint to map relations to string values
  async list(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.${camelCase}Service.findAllWithRelations();
      // Map relations to string if needed
      const mappedItems = items.map(item => ({
        ...item,
        // Example: relationField: item.relationField?.name || '',
      }));
      sendListResponse(res, this.schema, mappedItems);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching list', 400);
    }
  }
}
`,

  [`${snakeCase}.route.ts`]: `
import { Router } from 'express';
import { ${pascalCase}Controller } from './${snakeCase}.controller';
import { ${pascalCase}Service } from './${snakeCase}.service';
import { ${pascalCase}Repository } from './${snakeCase}.repository';

const repository = new ${pascalCase}Repository();
const service = new ${pascalCase}Service(repository);
const controller = new ${pascalCase}Controller(service);

const router = Router();

router.get('/', controller.list.bind(controller));
// Add more explicit routes as needed

export default router;
`,

  [`${snakeCase}.schema.ts`]: `
import { SchemaConfig, commonSchemaFields } from '../base.dto';

export const ${camelCase}Schema: SchemaConfig = {
  entity: '${pascalCase}',
  tableName: 'Master_${pascalCase}',
  columns: [
    { field: 'id', label: 'ID', type: 'number', isPrimary: true },
    { field: 'nameEn', label: 'Name (English)', type: 'string' },
    { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
    // Add more fields, use type: 'string' for relations that will be mapped to names
    ...commonSchemaFields,
  ],
  defaultVisibleColumns: ['nameEn', 'nameGu'],
};
`
};

// Write files
Object.entries(templates).forEach(([fileName, content]) => {
  fs.writeFileSync(path.join(moduleDir, fileName), content.trimStart());
});

console.log(`Successfully generated ${pascalCase} API in ${moduleDir}`);
console.log('Next steps:');
console.log(`1. Update src/app.module.ts to include ${pascalCase}Module`);
console.log(`2. Create a migration for Master_${pascalCase} table`);
console.log(`3. Run migrations: npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/config/database.ts`);
console.log(`4. Test the API: npm start`);