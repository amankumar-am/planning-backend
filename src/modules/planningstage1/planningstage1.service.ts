import { BaseService } from '../../core/base.service';
import { PlanningStage1Entity } from './planningstage1.entity';
import { PlanningStage1Repository } from './planningstage1.repository';
import { CreatePlanningStage1Dto, UpdatePlanningStage1Dto } from './planningstage1.type';

export class PlanningStage1Service extends BaseService<PlanningStage1Entity> {
  constructor(private readonly planningStage1Repository: PlanningStage1Repository) {
    super(planningStage1Repository);
  }

  async create(dto: CreatePlanningStage1Dto): Promise<PlanningStage1Entity> {
    return this.planningStage1Repository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdatePlanningStage1Dto): Promise<PlanningStage1Entity> {
    const planningStage1 = await this.planningStage1Repository.findOneOrFail({ where: { id } });
    Object.assign(planningStage1, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.planningStage1Repository.save(planningStage1);
  }

  async findAll(): Promise<PlanningStage1Entity[]> {
    const planningStage1s = await this.planningStage1Repository.findAll();
    console.log('PlanningStage1s:', planningStage1s); // Debug log
    return planningStage1s;
  }

  async findOne(id: number): Promise<PlanningStage1Entity> {
    const planningStage1 = await this.planningStage1Repository.findById(id);
    if (!planningStage1) {
      throw new Error(`PlanningStage1 with id ${id} not found`);
    }
    return planningStage1;
  }
}