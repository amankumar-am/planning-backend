// src/modules/taluka/taluka.controller.ts

import { TalukaService } from './taluka.service';
import { TalukaEntity } from './taluka.entity';
import { BaseController } from '../../core/base.controller';
import { talukaSchema } from '../../api/models/schemas/taluka.schema';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export class TalukaController extends BaseController<TalukaEntity> {
  constructor(private readonly talukaService: TalukaService) {
    super(talukaService, talukaSchema);
  }

  async getTalukasByDistrict(req: Request, res: Response) {
    const districtId = req.query.districtId as string;
    if (!districtId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'districtId query parameter is required' });
    }

    const parsedDistrictId = parseInt(districtId);
    if (isNaN(parsedDistrictId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'districtId must be a valid number' });
    }

    try {
      const talukas = await this.talukaService.getTalukasByDistrict(parsedDistrictId);
      if (talukas.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `No talukas found for district ID ${parsedDistrictId}` });
      }
      return res.status(StatusCodes.OK).json(talukas);
    } catch (error: Error | any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error fetching talukas', error: error.message });
    }
  }
}