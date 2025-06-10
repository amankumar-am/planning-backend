// src/modules/designation/designation.controller.ts
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { DesignationService } from './designation.service';
import { DesignationEntity } from './designation.entity';
import { BaseController } from '../../core/base.controller';
import { designationSchema } from '../../api/models/schemas/designation.schema';


export class DesignationController extends BaseController<DesignationEntity> {

  constructor(private readonly designationService: DesignationService) {
    super(designationService, designationSchema);
  }

  async getByDepartmentId(req: Request, res: Response): Promise<void> {
    try {
      const departmentId = parseInt(req.params.departmentId);
      if (isNaN(departmentId)) {
        throw new Error('Invalid department ID');
      }
      const designations = await this.designationService.findByDepartmentId(departmentId);
      // Map department to string and prant to string
      const mappedDesignations = designations.map(designation => ({
        ...designation,
        department: designation.department?.nameEn || designation.department?.name || ''
      }));
      sendListResponse(res, this.schema, mappedDesignations);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching designations', 400);
    }
  }

  async getTotalDesignations(req: Request, res: Response): Promise<void> {
    try {
      const departmentId = parseInt(req.params.departmentId);
      if (isNaN(departmentId)) {
        throw new Error('Invalid department ID');
      }
      const totalDesignations = await this.designationService.totalCount();

      res.json({ title: 'Total Designations', uniqueCount: totalDesignations });
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching total designations', 400);
    }
  }

  // Override the list endpoint to map department and prant to string values
  async list(req: Request, res: Response): Promise<void> {
    try {
      const designations = await this.designationService.findAllWithRelations();
      const mappedDesignations = designations.map(designation => ({
        ...designation,
        department: designation.department || '',
      }));
      sendListResponse(res, this.schema, mappedDesignations);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching designations', 400);
    }
  }
}