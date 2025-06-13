// src/modules/forms/ps1/ps1.route.ts

import { Router } from 'express';
import { PS1Controller } from './ps1.controller';
import { PS1Service } from './ps1.service';
import { PS1Repository } from './ps1.repository';

const repository = new PS1Repository();
const service = new PS1Service(repository);
const controller = new PS1Controller(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Get PS1 forms by financial year
router.get('/by-financial-year/:fyId', async (req, res) => {
    try {
        const forms = await service.findByFinancialYear(Number(req.params.fyId));
        res.json({ data: forms });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;