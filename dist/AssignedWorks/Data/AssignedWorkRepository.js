import { Repository } from '../../core/index';
import { AssignedWorkModel } from './AssignedWorkModel';
export class AssignedWorkRepository extends Repository {
    constructor() {
        super(AssignedWorkModel);
    }
}