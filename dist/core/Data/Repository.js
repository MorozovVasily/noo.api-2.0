import { CoreDataSource } from './DataSource';
import { Pagination } from './Pagination';
import { NotFoundError } from '../Errors/NotFoundError';
import { AlreadyExistError } from '../Errors/AlreadyExistError';
export class Repository {
    model;
    repository;
    constructor(model) {
        this.model = model;
        this.repository = CoreDataSource.getRepository(model);
    }
    async create(data) {
        const model = new this.model(data);
        try {
            await this.repository.save(model);
        }
        catch (error) {
            throw new AlreadyExistError();
        }
    }
    async update(data) {
        const item = await this.repository.findOne({
            where: {
                id: data.id,
            },
        });
        if (!item) {
            throw new NotFoundError();
        }
        const newItem = new this.model({ ...item, ...data, id: item.id });
        try {
            await this.repository.save(newItem);
        }
        catch (error) {
            throw new AlreadyExistError();
        }
    }
    async delete(id) {
        const exists = await this.repository.exist({
            where: {
                id,
            },
        });
        if (!exists) {
            throw new NotFoundError();
        }
        await this.repository.delete(id);
    }
    async find(conditions, relations, pagination = new Pagination()) {
        return (await this.repository.find({
            relations: relations || undefined,
            where: pagination.getCondition(conditions),
            order: pagination.orderOptions,
            skip: pagination.offset,
            take: pagination.take,
        }));
    }
    async findOne(conditions, relations) {
        return this.repository.findOne({
            relations: relations || undefined,
            where: conditions,
        });
    }
}