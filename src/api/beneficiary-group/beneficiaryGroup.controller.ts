// src/api/beneficiary-group/beneficiaryGroup.controller.ts
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
                { field: 'name_gu', label: 'Name Gu', type: 'string' },
                { field: 'description', label: 'Description', type: 'string' },
                { field: 'isActive', label: 'Active', type: 'boolean' },
                { field: 'createdBy', label: 'Created By', type: 'string' },
                { field: 'createdAt', label: 'Created At', type: 'datetime' },
                { field: 'modifiedBy', label: 'Modified By', type: 'string' },
                { field: 'modifiedAt', label: 'Modified At', type: 'datetime' }
            ];

            const defaultVisibleColumns = ['name'];

            res.status(200).json({
                schema: schema,
                data: beneficiaryGroups,
                defaultVisibleColumns: defaultVisibleColumns
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching beneficiary groups' });
        }
    }

    async getBeneficiaryGroupById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const beneficiaryGroup = await this.beneficiaryGroupService.getBeneficiaryGroupById(id);
            if (beneficiaryGroup) {
                res.status(200).json(beneficiaryGroup);
            } else {
                res.status(404).json({ message: 'Beneficiary group not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching beneficiary group' });
        }
    }

    async createBeneficiaryGroup(req: Request, res: Response): Promise<void> {
        try {
            const newBeneficiaryGroup = await this.beneficiaryGroupService.createBeneficiaryGroup(req.body);
            res.status(201).json(newBeneficiaryGroup);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Error creating beneficiary group' });
        }
    }

    async updateBeneficiaryGroup(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const updatedBeneficiaryGroup = await this.beneficiaryGroupService.updateBeneficiaryGroup(id, req.body);
            if (updatedBeneficiaryGroup) {
                res.status(200).json(updatedBeneficiaryGroup);
            } else {
                res.status(404).json({ message: 'Beneficiary group not found' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Error updating beneficiary group' });
        }
    }

    async deleteBeneficiaryGroup(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.beneficiaryGroupService.deleteBeneficiaryGroup(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: 'Error deleting beneficiary group' });
        }
    }
}