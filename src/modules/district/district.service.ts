import { BaseService } from '../../core/base.service';
import { DistrictEntity } from './district.entity';
import { DistrictRepository } from './district.repository';
import { CreateDistrictDto, UpdateDistrictDto } from './district.type';

export class DistrictService extends BaseService<DistrictEntity> {
  constructor(private readonly districtRepository: DistrictRepository) {
    super(districtRepository);
  }

  async create(dto: CreateDistrictDto): Promise<DistrictEntity> {
    return this.districtRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateDistrictDto): Promise<DistrictEntity> {
    const district = await this.districtRepository.findOneOrFail({ where: { id } });
    Object.assign(district, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.districtRepository.save(district);
  }

  async findAll(): Promise<DistrictEntity[]> {
    const districts = await this.districtRepository.findAll();
    console.log('Districts:', districts); // Debug log
    return districts;
  }

  async findOne(id: number): Promise<DistrictEntity> {
    const district = await this.districtRepository.findById(id);
    if (!district) {
      throw new Error(`District with id ${id} not found`);
    }
    return district;
  }
}