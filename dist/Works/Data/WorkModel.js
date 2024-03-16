var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Model, Transliteration, ULID } from '@core';
import { Column, Entity, OneToMany, RelationId, } from 'typeorm';
import { CourseMaterialModel } from '@modules/Courses/Data/Relations/CourseMaterialModel';
import { WorkTaskModel } from './Relations/WorkTaskModel';
import { AssignedWorkModel } from '@modules/AssignedWorks/Data/AssignedWorkModel';
let WorkModel = class WorkModel extends Model {
    constructor(data) {
        super();
        if (data) {
            this.set(data);
            this.tasks = (data.tasks || []).map((chapter) => new WorkTaskModel(chapter));
            this.assignedWorks = (data.assignedWorks || []).map((assignedWork) => new AssignedWorkModel(assignedWork));
            if (!data.slug) {
                this.slug = this.sluggify(this.name);
            }
        }
    }
    slug;
    name;
    type = 'test';
    description;
    materials;
    tasks;
    taskIds;
    assignedWorks;
    assignedWorkIds;
    static entriesToSearch() {
        return ['name', 'description'];
    }
    sluggify(text) {
        return ULID.generate() + '-' + Transliteration.sluggify(text);
    }
};
__decorate([
    Column({
        name: 'slug',
        type: 'varchar',
    }),
    __metadata("design:type", String)
], WorkModel.prototype, "slug", void 0);
__decorate([
    Column({
        name: 'name',
        type: 'varchar',
    }),
    __metadata("design:type", String)
], WorkModel.prototype, "name", void 0);
__decorate([
    Column({
        name: 'type',
        type: 'enum',
        enum: ['trial-work', 'phrase', 'mini-test', 'test', 'second-part'],
        default: 'test',
    }),
    __metadata("design:type", String)
], WorkModel.prototype, "type", void 0);
__decorate([
    Column({
        name: 'description',
        type: 'text',
    }),
    __metadata("design:type", String)
], WorkModel.prototype, "description", void 0);
__decorate([
    OneToMany(() => CourseMaterialModel, (material) => material.work),
    __metadata("design:type", Object)
], WorkModel.prototype, "materials", void 0);
__decorate([
    OneToMany(() => WorkTaskModel, (task) => task.work, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], WorkModel.prototype, "tasks", void 0);
__decorate([
    RelationId((work) => work.tasks),
    __metadata("design:type", Array)
], WorkModel.prototype, "taskIds", void 0);
__decorate([
    OneToMany(() => AssignedWorkModel, (assignedWork) => assignedWork.work),
    __metadata("design:type", Array)
], WorkModel.prototype, "assignedWorks", void 0);
__decorate([
    RelationId((work) => work.assignedWorks),
    __metadata("design:type", Array)
], WorkModel.prototype, "assignedWorkIds", void 0);
WorkModel = __decorate([
    Entity('work'),
    __metadata("design:paramtypes", [Object])
], WorkModel);
export { WorkModel };
