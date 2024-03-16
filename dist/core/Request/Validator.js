var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pagination } from '../Data/Pagination.js';
import { z } from 'zod';
import { ErrorConverter } from './ValidatorDecorator.js';
let Validator = class Validator {
    validatePagination(data) {
        const schema = z.object({
            page: z.coerce.number().int().positive().optional(),
            limit: z.coerce.number().int().positive().optional(),
            sort: z.string().optional(),
            order: z.enum(['ASC', 'DESC']).optional(),
            search: z.string().optional(),
            filter: z.record(z.any()).optional(),
        });
        const pagination = schema.parse(data);
        return new Pagination(pagination.page, pagination.limit, pagination.sort, pagination.order, pagination.search, pagination.filter);
    }
    validateId(id) {
        const schema = z.string().ulid();
        schema.parse(id);
    }
    validateSlug(slug) {
        const schema = z.string().min(2).max(256);
        schema.parse(slug);
    }
};
Validator = __decorate([
    ErrorConverter()
], Validator);
export { Validator };
