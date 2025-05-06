// src/api/financial-year/financial-year.controller.ts
import { Request, Response } from 'express';
import { FinancialYearService } from './financialYear.service';

export class FinancialYearController {
    constructor(private financialYearService: FinancialYearService) { }

    async getAllFinancialYears(req: Request, res: Response): Promise<void> {
        try {
            const financialYears = await this.financialYearService.getAllFinancialYears();
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

            res.status(200).json({ schema, data: financialYears });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching financial years' });
        }
    }

    async getFinancialYearById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const financialYear = await this.financialYearService.getFinancialYearById(id);
            if (financialYear) {
                res.status(200).json(financialYear);
            } else {
                res.status(404).json({ message: 'Financial year not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching financial year' });
        }
    }

    async getCurrentFinancialYear(req: Request, res: Response): Promise<void> {
        try {
            const financialYear = await this.financialYearService.getCurrentFinancialYear();
            if (financialYear) {
                res.status(200).json(financialYear);
            } else {
                res.status(404).json({ message: 'No current financial year set' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching current financial year' });
        }
    }

    async createFinancialYear(req: Request, res: Response): Promise<void> {
        try {
            const newFinancialYear = await this.financialYearService.createFinancialYear(req.body);
            res.status(201).json(newFinancialYear);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Error creating financial year' });
        }
    }

    async updateFinancialYear(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const updatedFinancialYear = await this.financialYearService.updateFinancialYear(id, req.body);
            if (updatedFinancialYear) {
                res.status(200).json(updatedFinancialYear);
            } else {
                res.status(404).json({ message: 'Financial year not found' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Error updating financial year' });
        }
    }

    async deleteFinancialYear(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.financialYearService.deleteFinancialYear(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: 'Error deleting financial year' });
        }
    }

    async setCurrentFinancialYear(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.financialYearService.setCurrentFinancialYear(id);
            res.status(200).json({ message: 'Financial year set as current successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Error setting current financial year' });
        }
    }
}