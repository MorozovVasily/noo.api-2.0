import { StatusCodes } from 'http-status-codes';
export class WorkAlreadySolvedError extends Error {
    code = StatusCodes.CONFLICT;
    message;
    constructor(message = 'The work has already been solved') {
        super();
        this.message = message;
    }
}
