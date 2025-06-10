// src/modules/state/state.service.ts

import { BaseService } from '../../core/base.service';
import { StateEntity } from './state.entity';
import { StateRepository } from './state.repository';
import { CreateStateDto, UpdateStateDto } from './state.type';

export class StateService extends BaseService<StateEntity> {
  constructor(private readonly stateRepository: StateRepository) {
    super(stateRepository);
  }

  async create(dto: CreateStateDto): Promise<StateEntity> {
    return this.stateRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateStateDto): Promise<StateEntity> {
    const state = await this.stateRepository.findOneOrFail({ where: { id } });
    Object.assign(state, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.stateRepository.save(state);
  }

  async findAll(): Promise<StateEntity[]> {
    const states = await this.stateRepository.findAll();
    return states;
  }

  async findOne(id: number): Promise<StateEntity> {
    const state = await this.stateRepository.findById(id);
    if (!state) {
      throw new Error(`State with id ${id} not found`);
    }
    return state;
  }
}