import { StatusCodes } from 'http-status-codes'

export class WorkAlreadySolvedError extends Error {
	code = StatusCodes.CONFLICT
	message: string

	constructor(message = 'Работа уже выполнена.') {
		super()
		this.message = message
	}
}
