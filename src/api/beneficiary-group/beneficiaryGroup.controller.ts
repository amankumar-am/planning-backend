// src/controllers/financial-year.controller.ts
import { Request, Response } from 'express';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';

export class BeneficiaryGroupController {
    constructor(private beneficiaryGroupService: BeneficiaryGroupService) { }

    async getAllBeneficiaryGroups(req: Request, res: Response): Promise<void> {
        try {
            const beneficiaryGroups = await this.beneficiaryGroupService.getAllBeneficiaryGroups();

            const schema = [
                { field: 'id', label: 'ID', type: 'number' },
                { field: 'name', label: 'Name', type: 'string' },
                { field: 'duration', label: 'Duration', type: 'string' },
                { field: 'startDate', label: 'Start Date', type: 'date' },
                { field: 'endDate', label: 'End Date', type: 'date' },
                { field: 'isActive', label: 'Active', type: 'boolean' },
                { field: 'isCurrent', label: 'Current', type: 'boolean' },
                { field: 'createdBy', label: 'Created By', type: 'string' },
                { field: 'createdAt', label: 'Created At', type: 'datetime' },
                { field: 'modifiedBy', label: 'Modified By', type: 'string' },
                { field: 'modifiedAt', label: 'Modified At', type: 'datetime' }
            ];

            res.status(200).json({ schema, data: beneficiaryGroups });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching financial years' });
        }
    }

    async getBeneficiaryGroupById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const beneficiaryGroup = await this.beneficiaryGroupService.getBeneficiaryGroupById(id);
            if (beneficiaryGroup) {
                res.status(200).json(beneficiaryGroup);
            } else {
                res.status(404).json({ message: 'Financial year not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching financial year' });
        }
    }

    async getCurrentBeneficiaryGroup(req: Request, res: Response): Promise<void> {
        try {
            const beneficiaryGroup = await this.beneficiaryGroupService.getCurrentBeneficiaryGroup();
            if (beneficiaryGroup) {
                res.status(200).json(beneficiaryGroup);
            } else {
                res.status(404).json({ message: 'No current financial year set' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching current financial year' });
        }
    }

    async createBeneficiaryGroup(req: Request, res: Response): Promise<void> {
        try {
            const newBeneficiaryGroup = await this.beneficiaryGroupService.createBeneficiaryGroup(req.body);
            res.status(201).json(newBeneficiaryGroup);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Error creating financial year' });
        }
    }

    async updateBeneficiaryGroup(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const updatedBeneficiaryGroup = await this.beneficiaryGroupService.updateBeneficiaryGroup(id, req.body);
            if (updatedBeneficiaryGroup) {
                res.status(200).json(updatedBeneficiaryGroup);
            } else {
                res.status(404).json({ message: 'Financial year not found' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Error updating financial year' });
        }
    }

    async deleteBeneficiaryGroup(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.beneficiaryGroupService.deleteBeneficiaryGroup(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: 'Error deleting financial year' });
        }
    }

    async setCurrentBeneficiaryGroup(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.beneficiaryGroupService.setCurrentBeneficiaryGroup(id);
            res.status(200).json({ message: 'Financial year set as current successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Error setting current financial year' });
        }
    }
}