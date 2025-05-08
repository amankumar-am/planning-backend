import { BaseService } from '../../core/base.service';
import { SubSectorEntity } from './subsector.entity';
import { SubSectorRepository } from './subsector.repository';
import { CreateSubSectorDto, UpdateSubSectorDto } from './subsector.type';

export class SubSectorService extends BaseService<SubSectorEntity> {
  constructor(private readonly subSectorRepository: SubSectorRepository) {
    super(subSectorRepository);
  }

  async create(dto: CreateSubSectorDto): Promise<SubSectorEntity> {
    return this.subSectorRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateSubSectorDto): Promise<SubSectorEntity> {
    const subSector = await this.subSectorRepository.findOneOrFail({ where: { id } });
    Object.assign(subSector, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.subSectorRepository.save(subSector);
  }

  async findAll(): Promise<SubSectorEntity[]> {
    const subSectors = await this.subSectorRepository.findAll();
    console.log('SubSectors:', subSectors); // Debug log
    return subSectors;
  }

  async findOne(id: number): Promise<SubSectorEntity> {
    const subSector = await this.subSectorRepository.findById(id);
    if (!subSector) {
      throw new Error(`SubSector with id ${id} not found`);
    }
    return subSector;
  }
}