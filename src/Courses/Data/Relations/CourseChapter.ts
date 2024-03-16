import { ULID } from '@core'
import { Course } from '../Course'
import { CourseMaterial } from './CourseMaterial'

export interface CourseChapter {
	id: ULID.Ulid
	name: string
	slug: string
	courseId?: string
	course?: Course
	materials?: CourseMaterial[]
	materialIds: string[]
	order: number
	createdAt: Date
	updatedAt: Date
}
