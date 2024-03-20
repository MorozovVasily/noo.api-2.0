import { ErrorConverter } from '@modules/Core/Request/ValidatorDecorator'
import { Validator } from '@modules/Core/Request/Validator'
import { AssignedWork } from './Data/AssignedWork'
import { z } from 'zod'

@ErrorConverter()
export class AssignedWorkValidator extends Validator {
	public validateCreation(data: unknown): asserts data is AssignedWork {
		const schema = z.object({
			studentId: z.string().ulid(),
			workId: z.string().ulid(),
		})

		schema.parse(data)
	}

	public validateUpdate(data: unknown): asserts data is AssignedWork {
		const schema = z.object({
			id: z.string().ulid(),
			studentId: z.string().ulid().optional().nullable(),
			workId: z.string().ulid().optional().nullable(),
			mentorIds: z.array(z.string().ulid()).optional(),
			answers: z
				.array(
					z.object({
						content: z.any().optional().nullable(),
						word: z.string().optional().nullable(),
						taskId: z.string().ulid(),
					})
				)
				.optional(),
			comments: z
				.array(
					z.object({
						content: z.any().optional().nullable(),
						score: z.number().optional().nullable(),
						taskId: z.string().ulid(),
					})
				)
				.optional(),
		})

		schema.parse(data)
	}
}
