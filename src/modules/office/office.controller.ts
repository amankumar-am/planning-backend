// src/modules/office/office.controller.ts

import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { BaseController } from '../../core/base.controller';
import { OfficeEntity } from './office.entity';
import { OfficeService } from './office.service';
import { OfficeSchema } from '../../api/models/schemas/office.schema';


export class OfficeController extends BaseController<OfficeEntity> {
    constructor(private officeService: OfficeService) {
        super(
            officeService,
            OfficeSchema,
            ['department', 'reportsTo', 'officeLevel', 'state', 'district', 'prant', 'taluka', 'village'], // relations
            ['name', 'nameEn', 'nameGu', 'code', 'nicCode', 'email', 'address'] // searchable fields
        );
    }

    // Override the list endpoint to map sector to string value
    async list(req: Request, res: Response): Promise<void> {
        try {
            const offices = await this.officeService.findAllWithRelations();
            const mappedOffices = offices.map(office => ({
                ...office,
                department: office.department || null,
                reportsTo: office.reportsTo || null,
                officeLevel: office.officeLevel || null,
                state: office.state || null,
                district: office.district || null,
                prant: office.prant || null,
                taluka: office.taluka || null,
                village: office.village || null,

            }));
            sendListResponse(res, this.schema, mappedOffices);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching offices', 400);
        }
    }

    async listWithQuery(req: Request, res: Response): Promise<void> {
        await this.getAllWithQuery(req, res);
    }
}