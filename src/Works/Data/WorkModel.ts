import * as ULID from '@modules/Core/Data/Ulid'
import { Model } from '@modules/Core/Data/Model'
import * as Transliteration from '@modules/Core/Utils/transliteration'
import { Work } from './Work'
import { CourseMaterial } from '@modules/Courses/Data/Relations/CourseMaterial'
import { WorkTask } from './Relations/WorkTask'
import {
	Column,
	Entity,
	OneToMany,
	OneToOne,
	RelationId,
} from 'typeorm'
import { CourseMaterialModel } from '@modules/Courses/Data/Relations/CourseMaterialModel'
import { WorkTaskModel } from './Relations/WorkTaskModel'
import { AssignedWork } from '@modules/AssignedWorks/Data/AssignedWork'
import { AssignedWorkModel } from '@modules/AssignedWorks/Data/AssignedWorkModel'

@Entity('work')
export class WorkModel extends Model implements Work {
	constructor(data?: Partial<Work>) {
		super()

		if (data) {
			this.set(data)

			this.tasks = (data.tasks || []).map(
				(chapter) => new WorkTaskModel(chapter)
			)

			this.assignedWorks = (data.assignedWorks || []).map(
				(assignedWork) => new AssignedWorkModel(assignedWork)
			)

			if (!data.slug) {
				this.slug = this.sluggify(this.name)
			}
		}
	}

	@Column({
		name: 'slug',
		type: 'varchar',
	})
	slug!: string

	@Column({
		name: 'name',
		type: 'varchar',
	})
	name!: string

	@Column({
		name: 'type',
		type: 'enum',
		enum: ['trial-work', 'phrase', 'mini-test', 'test', 'second-part'],
		default: 'test',
	})
	type: 'trial-work' | 'phrase' | 'mini-test' | 'test' | 'second-part' =
		'test'

	@Column({
		name: 'description',
		type: 'text',
	})
	description!: string

	@OneToMany(() => CourseMaterialModel, (material) => material.work)
	materials?: CourseMaterial[] | undefined

	@OneToMany(() => WorkTaskModel, (task) => task.work, {
		cascade: true,
	})
	tasks!: WorkTask[]

	@RelationId((work: WorkModel) => work.tasks)
	taskIds!: string[]

	@OneToMany(
		() => AssignedWorkModel,
		(assignedWork) => assignedWork.work
	)
	assignedWorks!: AssignedWork[]

	@RelationId((work: WorkModel) => work.assignedWorks)
	assignedWorkIds!: string[]

	static entriesToSearch() {
		return ['name', 'description']
	}

	private sluggify(text: string): string {
		return ULID.generate() + '-' + Transliteration.sluggify(text)
	}
}
