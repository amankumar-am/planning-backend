// src/modules/forms/ps1/ps1.controller.ts

import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../../core/response.util';
import { BaseController } from '../../../core/base.controller';
import { PS1Entity } from './ps1.entity';
import { PS1Service } from './ps1.service';
import { PS1Schema } from '../../../api/models/schemas/forms/ps1.schema';;


export class PS1Controller extends BaseController<PS1Entity> {
    constructor(private ps1Service: PS1Service) {
        super(
            ps1Service,
            PS1Schema,
            ['financialYear', 'fund', 'mpmla', 'sector', 'subSector', 'district', 'taluka', 'village', 'nagarpalika', 'demandOfficer', 'assignPSTo', 'implementationOfficer'], // relations
            ['schemeName', 'implementationName', 'description'] // searchable fields
        );
    }

    // Override the list endpoint to map sector to string value
    async list(req: Request, res: Response): Promise<void> {
        try {
            const ps1s = await this.ps1Service.findAllWithRelations();
            const mappedPS1s = ps1s.map(ps1 => ({
                ...ps1,
                financialYear: ps1.financialYear || null,
                fund: ps1.fund || null,
                mpmla: ps1.mpmla || null,
                sector: ps1.sector || null,
                subSector: ps1.subSector || null,
                district: ps1.district || null,
                taluka: ps1.taluka || null,
                village: ps1.village || null,
                nagarpalika: ps1.nagarpalika || null,
                demandOfficer: ps1.demandOfficer || null,
                assignPSTo: ps1.assignPSTo || null,
                implementationOfficer: ps1.implementationOfficer || null,
            }));
            sendListResponse(res, this.schema, mappedPS1s);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching ps1s', 400);
        }
    }

    async listWithQuery(req: Request, res: Response): Promise<void> {
        await this.getAllWithQuery(req, res);
    }
}