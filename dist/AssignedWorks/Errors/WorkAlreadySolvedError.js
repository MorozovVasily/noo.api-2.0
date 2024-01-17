import { StatusCodes } from 'http-status-codes';
export class WorkAlreadySolvedError extends Error {
    code = StatusCodes.CONFLICT;
    constructor() {
        super();
    }
}