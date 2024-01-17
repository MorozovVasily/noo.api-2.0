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
import { Column, Entity, ManyToOne, OneToMany, RelationId, } from 'typeorm';
import { WorkModel } from '../WorkModel';
import { WorkTaskOptionModel } from './WorkTaskOptionModel';
import { AssignedWorkAnswerModel } from '@modules/AssignedWorks/Data/Relations/AssignedWorkAnswerModel';
import { AssignedWorkCommentModel } from '@modules/AssignedWorks/Data/Relations/AssignedWorkCommentModel';
let WorkTaskModel = class WorkTaskModel extends Model {
    constructor(data) {
        super();
        if (data) {
            this.set(data);
            this.options = (data.options || []).map((option) => new WorkTaskOptionModel(option));
            this.assignedWorkAnswers = (data.assignedWorkAnswers || []).map((answer) => new AssignedWorkAnswerModel(answer));
            this.assignedWorkComments = (data.assignedWorkComments || []).map((comment) => new AssignedWorkCommentModel(comment));
            if (!data.slug) {
                this.slug = this.sluggify(this.name);
            }
        }
    }
    slug;
    name;
    content;
    highestScore;
    type;
    work;
    workId;
    rightAnswer;
    options;
    get optionIds() {
        return this.options?.map((option) => option.id);
    }
    set optionIds(ids) { }
    assignedWorkAnswers;
    get assignedWorkAnswerIds() {
        return this.assignedWorkAnswers?.map((answer) => answer.id);
    }
    set assignedWorkAnswerIds(ids) { }
    assignedWorkComments;
    get assignedWorkCommentIds() {
        return this.assignedWorkComments?.map((comment) => comment.id);
    }
    set assignedWorkCommentIds(ids) { }
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
], WorkTaskModel.prototype, "slug", void 0);
__decorate([
    Column({
        name: 'name',
        type: 'varchar',
    }),
    __metadata("design:type", String)
], WorkTaskModel.prototype, "name", void 0);
__decorate([
    Column({
        name: 'content',
        type: 'json',
    }),
    __metadata("design:type", Object)
], WorkTaskModel.prototype, "content", void 0);
__decorate([
    Column({
        name: 'highest_score',
        type: 'int',
    }),
    __metadata("design:type", Number)
], WorkTaskModel.prototype, "highestScore", void 0);
__decorate([
    Column({
        name: 'type',
        type: 'enum',
        enum: ['text', 'one_choice', 'multiple_choice', 'word'],
        default: 'text',
    }),
    __metadata("design:type", String)
], WorkTaskModel.prototype, "type", void 0);
__decorate([
    ManyToOne(() => WorkModel, (work) => work.tasks, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], WorkTaskModel.prototype, "work", void 0);
__decorate([
    RelationId((task) => task.work),
    __metadata("design:type", Object)
], WorkTaskModel.prototype, "workId", void 0);
__decorate([
    Column({
        name: 'right_answer',
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", Object)
], WorkTaskModel.prototype, "rightAnswer", void 0);
__decorate([
    OneToMany(() => WorkTaskOptionModel, (taskOption) => taskOption.task, { eager: true, cascade: true }),
    __metadata("design:type", Object)
], WorkTaskModel.prototype, "options", void 0);
__decorate([
    OneToMany(() => AssignedWorkAnswerModel, (answer) => answer.task),
    __metadata("design:type", Object)
], WorkTaskModel.prototype, "assignedWorkAnswers", void 0);
__decorate([
    OneToMany(() => AssignedWorkCommentModel, (comment) => comment.task),
    __metadata("design:type", Object)
], WorkTaskModel.prototype, "assignedWorkComments", void 0);
WorkTaskModel = __decorate([
    Entity('work_task'),
    __metadata("design:paramtypes", [Object])
], WorkTaskModel);
export { WorkTaskModel };
