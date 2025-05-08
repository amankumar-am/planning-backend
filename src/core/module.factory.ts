// src/core/module.factory.ts

import { Router } from 'express';
import { ObjectLiteral } from 'typeorm';
import { BaseController } from './base.controller';

export function createModuleRouter<T extends ObjectLiteral>(controller: BaseController<T>, basePath: string): Router {
    const router = Router();

    router.get('/', controller.getAll.bind(controller));
    router.get('/:id', controller.getById.bind(controller));
    router.post('/', controller.create.bind(controller));
    router.put('/:id', controller.update.bind(controller));
    router.delete('/:id', controller.delete.bind(controller));

    return router;
}