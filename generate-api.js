// generate-api.js

const fs = require('fs');
const path = require('path');

// Get API name from command-line argument
const apiName = process.argv[2];
if (!apiName) {
  console.error('Please provide an API name (e.g., node generate-api.js sector)');
  process.exit(1);
}

// Convert API name to camelCase and PascalCase
const camelCase = apiName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
const snakeCase = apiName.toLowerCase().replace(/ /g, '_');

// Define module directory
const moduleDir = path.join(__dirname, 'src', 'modules', snakeCase);
if (fs.existsSync(moduleDir)) {
  console.error(`Directory ${moduleDir} already exists. Choose a different API name.`);
  process.exit(1);
}

// Create module directory
fs.mkdirSync(moduleDir, { recursive: true });

// File templates
const templates = {
  // Entity
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

  @Column({ name: 'Description_En', length: 500, nullable: true })
  descriptionEn?: string;

  @Column({ name: 'Description_Gu', length: 500, nullable: true })
  descriptionGu?: string;
}
`,

  // Type (DTOs)
  [`${snakeCase}.type.ts`]: `
import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class Create${pascalCase}Dto extends BaseDtoFields {
  @IsString()
  nameEn!: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @IsString()
  @IsOptional()
  descriptionGu?: string;
}

export class Update${pascalCase}Dto implements Partial<Create${pascalCase}Dto> {
  @IsString()
  @IsOptional()
  nameEn?: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @IsString()
  @IsOptional()
  descriptionGu?: string;

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

  // Repository
  [`${snakeCase}.repository.ts`]: `
import { ${pascalCase}Entity } from './${snakeCase}.entity';
import { BaseRepository } from '../../core/base.repository';

export class ${pascalCase}Repository extends BaseRepository<${pascalCase}Entity> {
  constructor() {
    super(${pascalCase}Entity);
  }
}
`,

  // Service
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

  async update(id: number, dto: Update${pascalCase}Dto): Promise<${pascalCase}Entity> {
    const ${camelCase} = await this.${camelCase}Repository.findOneOrFail({ where: { id } });
    Object.assign(${camelCase}, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.${camelCase}Repository.save(${camelCase});
  }

  async findAll(): Promise<${pascalCase}Entity[]> {
    const ${camelCase}s = await this.${camelCase}Repository.findAll();
    console.log('${pascalCase}s:', ${camelCase}s); // Debug log
    return ${camelCase}s;
  }

  async findOne(id: number): Promise<${pascalCase}Entity> {
    const ${camelCase} = await this.${camelCase}Repository.findById(id);
    if (!${camelCase}) {
      throw new Error(\`${pascalCase} with id \${id} not found\`);
    }
    return ${camelCase};
  }
}
`,

  // Controller
  [`${snakeCase}.controller.ts`]: `
import { ${pascalCase}Service } from './${snakeCase}.service';
import { ${pascalCase}Entity } from './${snakeCase}.entity';
import { BaseController } from '../../core/base.controller';
import { ${pascalCase}Schema } from '../../api/models/schemas/${snakeCase}.schema';

export class ${pascalCase}Controller extends BaseController<${pascalCase}Entity> {
  constructor(private readonly ${camelCase}Service: ${pascalCase}Service) {
    super(${camelCase}Service, ${pascalCase}Schema);
  }
}
`,

  // Route
  [`${snakeCase}.route.ts`]: `
import { createModuleRouter } from '../../core/module.factory';
import { ${pascalCase}Controller } from './${snakeCase}.controller';
import { ${pascalCase}Service } from './${snakeCase}.service';
import { ${pascalCase}Repository } from './${snakeCase}.repository';

const repository = new ${pascalCase}Repository();
const service = new ${pascalCase}Service(repository);
const controller = new ${pascalCase}Controller(service);

export default createModuleRouter(controller, '/${snakeCase}s');
`,

  // Schema
  [`${snakeCase}.schema.ts`]: `
import { SchemaConfig, commonSchemaFields } from '../../api/models/base.dto';

export const ${camelCase}Schema: SchemaConfig = {
  entity: '${pascalCase}',
  tableName: 'Master_${pascalCase}',
  columns: [
    { field: 'id', label: 'ID', type: 'number', isPrimary: true },
    { field: 'nameEn', label: 'Name (English)', type: 'string' },
    { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
    { field: 'descriptionEn', label: 'Description (English)', type: 'string' },
    { field: 'descriptionGu', label: 'Description (Gujarati)', type: 'string' },
    ...commonSchemaFields, // Include common fields
  ],
  defaultVisibleColumns: ['nameEn', 'nameGu', 'descriptionEn'],
};
`
};

// Write files
Object.entries(templates).forEach(([fileName, content]) => {
  const filePath = path.join(moduleDir, fileName);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Created ${filePath}`);
});

console.log(`Successfully generated ${pascalCase} API in ${moduleDir}`);
console.log('Next steps:');
console.log(`1. Update src/app.module.ts to include ${pascalCase}Module`);
console.log(`2. Create a migration for Master_${pascalCase} table`);
console.log(`3. Run migrations: npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/config/database.ts`);
console.log(`4. Test the API: npm start`);