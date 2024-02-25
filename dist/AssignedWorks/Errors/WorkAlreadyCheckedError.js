import { StatusCodes } from 'http-status-codes';
export class WorkAlreadyCheckedError extends Error {
    code = StatusCodes.CONFLICT;
    message;
    constructor(message = 'The work has already been checked') {
        super();
        this.message = message;
    }
}
