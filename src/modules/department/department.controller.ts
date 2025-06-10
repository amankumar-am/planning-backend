// src/modules/department/department.controller.ts
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { DepartmentService } from './department.service';
import { DepartmentEntity } from './department.entity';
import { BaseController } from '../../core/base.controller';
import { departmentSchema } from '../../api/models/schemas/department.schema';


export class DepartmentController extends BaseController<DepartmentEntity> {

  constructor(private readonly departmentService: DepartmentService) {
    super(departmentService, departmentSchema);
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.getAll();
      sendListResponse(res, this.schema, items);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching departments', 400);
    }
  }


  async getTotalDepartments(req: Request, res: Response): Promise<void> {
    try {
      const totalDepartments = await this.departmentService.totalCount();

      res.json({ title: 'Total Departments', uniqueCount: totalDepartments });
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching total departments', 400);
    }
  }
}