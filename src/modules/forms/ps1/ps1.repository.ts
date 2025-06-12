// src/modules/forms/ps1/ps1.repository.ts

import { PS1Entity } from './ps1.entity';
import { BaseRepository } from '../../../core/base.repository';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/database';

export class PS1Repository extends BaseRepository<PS1Entity> {
    protected repository: Repository<PS1Entity>;

    constructor() {
        super(PS1Entity);
        this.repository = AppDataSource.getRepository(PS1Entity);
    }

    async findAll(): Promise<PS1Entity[]> {
        try {
            return await this.repository.find({
                relations: [
                    'financialYear',
                    'fund',
                    'mpmla',
                    'sector',
                    'subSector',
                    'district',
                    'taluka',
                    'village',
                    'nagarpalika',
                    'demandOfficer',
                    'assignPSTo',
                    'implementationOfficer',
                    'beneficiaryGroup'
                ],
                order: {
                    createdAt: 'DESC'
                }
            });
        } catch (error) {
            console.error('Error in PS1Repository.findAll:', error);
            return [];
        }
    }

    async findById(id: number): Promise<PS1Entity | null> {
        try {
            return await this.repository.findOne({
                where: { id },
                relations: [
                    'financialYear',
                    'fund',
                    'mpmla',
                    'sector',
                    'subSector',
                    'district',
                    'taluka',
                    'village',
                    'nagarpalika',
                    'demandOfficer',
                    'assignPSTo',
                    'implementationOfficer',
                    'beneficiaryGroup'
                ]
            });
        } catch (error) {
            console.error(`Error in PS1Repository.findById(${id}):`, error);
            return null;
        }
    }

    async findByFinancialYearId(financialYearId: number): Promise<PS1Entity[]> {
        try {
            return await this.repository.find({
                where: { financialYear: { id: financialYearId } },
                relations: [
                    'financialYear',
                    'fund',
                    'mpmla',
                    'sector',
                    'subSector'
                ]
            });
        } catch (error) {
            console.error(`Error in PS1Repository.findByFinancialYearId(${financialYearId}):`, error);
            return [];
        }
    }

    async findAllWithRelations(relations: string[]): Promise<PS1Entity[]> {
        try {
            return await this.repository.find({
                relations,
                order: {
                    createdAt: 'DESC'
                }
            });
        } catch (error) {
            console.error('Error in PS1Repository.findAllWithRelations:', error);
            return [];
        }
    }

    async create(data: Partial<PS1Entity>): Promise<PS1Entity> {
        try {
            const entity = this.repository.create(data);
            return await this.repository.save(entity);
        } catch (error) {
            console.error('Error in PS1Repository.create:', error);
            throw error;
        }
    }

    async save(entity: PS1Entity): Promise<PS1Entity> {
        try {
            return await this.repository.save(entity);
        } catch (error) {
            console.error('Error in PS1Repository.save:', error);
            throw error;
        }
    }
}