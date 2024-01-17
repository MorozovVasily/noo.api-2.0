import { Validator } from '../core/index.js';
import { z } from 'zod';
export class CourseValidator extends Validator {
    validateCreation(course) {
        const schema = z.object({
            name: z.string().min(3).max(255),
            description: z.string().max(255).optional(),
            chapters: z
                .array(z.object({
                name: z.string().max(255),
                materials: z
                    .array(z.object({
                    name: z.string().max(255),
                    description: z.string().optional(),
                    content: z.any().optional(),
                }))
                    .optional(),
            }))
                .optional(),
        });
        schema.parse(course);
    }
    validateUpdate(course) {
        const schema = z.object({
            id: z.string().ulid(),
            name: z.string().min(3).max(255).optional(),
            description: z.string().optional(),
            chapters: z
                .array(z.object({
                id: z.string().ulid().optional(),
                name: z.string().max(255).optional(),
                materials: z
                    .array(z.object({
                    id: z.string().ulid().optional(),
                    name: z.string().max(255).optional(),
                    description: z.string().optional(),
                    content: z.any().optional(),
                }))
                    .optional(),
            }))
                .optional(),
        });
        schema.parse(course);
    }
    validateStudentIds(body) {
        const schema = z.object({
            studentIds: z.array(z.string().ulid()),
        });
        schema.parse(body);
    }
    validateAssignWork(data) {
        const schema = z.object({
            checkDeadline: z.date().optional(),
            solveDeadline: z.date().optional(),
        });
        schema.parse(data);
    }
}
