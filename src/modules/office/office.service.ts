// src/modules/office/office.service.ts

// import { BaseService } from '../../core/base.service';
// import { OfficeEntity } from './office.entity';
// import { OfficeRepository } from './office.repository';
// import { CreateOfficeDto, UpdateOfficeDto } from './office.type';

// export class OfficeService extends BaseService<OfficeEntity> {
//   constructor(private readonly subSectorRepository: OfficeRepository) {
//     super(subSectorRepository);
//   }

//   async create(dto: CreateOfficeDto): Promise<OfficeEntity> {
//     return this.subSectorRepository.create({
//       ...dto,
//       sector: { id: dto.sector } as any,
//       isActive: dto.isActive ?? true,
//       createdBy: dto.createdBy ?? 'system',
//       createdAt: dto.createdAt ?? new Date(),
//       modifiedBy: dto.modifiedBy ?? 'system',
//       modifiedAt: dto.modifiedAt ?? null,
//     });
//   }

//   async update(id: number, dto: UpdateOfficeDto): Promise<OfficeEntity> {
//     const subSector = await this.subSectorRepository.findOneOrFail({ where: { id } });
//     Object.assign(subSector, {
//       ...dto,
//       modifiedBy: dto.modifiedBy,
//       modifiedAt: dto.modifiedAt,
//     });
//     return this.subSectorRepository.save(subSector);
//   }

//   async findAll(): Promise<OfficeEntity[]> {
//     const subSectors = await this.subSectorRepository.findAll();
//     return subSectors;
//   }

//   async findAllWithRelations(): Promise<OfficeEntity[]> {
//     return this.subSectorRepository.findAllWithRelations(['sector']);
//   }

//   async findOne(id: number): Promise<OfficeEntity> {
//     const subSector = await this.subSectorRepository.findById(id);
//     if (!subSector) {
//       throw new Error(`Office with id ${id} not found`);
//     }
//     return subSector;
//   }

//   async findBySectorId(sectorId: number): Promise<OfficeEntity[]> {
//     const talukas = await this.subSectorRepository.findBySectorId(sectorId);
//     if (!talukas || talukas.length === 0) {
//       throw new Error(`No talukas found for district ID ${sectorId}`);
//     }
//     return talukas;
//   }
// }