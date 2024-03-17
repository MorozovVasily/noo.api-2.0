import { AssignedWork } from '@modules/AssignedWorks/Data/AssignedWork'
import { Pagination, Service, UnauthorizedError } from '@core'
import { CalenderEvent } from '../Data/CalenderEvent'
import { CalenderEventRepository } from '../Data/CalenderEventRepository'
import { User } from '@modules/Users/Data/User'

export class CalenderService extends Service<CalenderEvent> {
	private readonly calenderEventRepository: CalenderEventRepository

	constructor() {
		super()

		this.calenderEventRepository = new CalenderEventRepository()
	}

	public async create(
		event: CalenderEvent,
		username: User['username']
	): Promise<void> {
		await this.calenderEventRepository.create({ ...event, username })
	}

	public async createFromWork(work: AssignedWork): Promise<void> {
		console.log('Creating events from work', work.work.name)
		if (work.solveDeadlineAt) {
			console.log('Creating solve deadline event')
			await this.createSolveDeadlineEvent(work)
		}

		if (work.checkDeadlineAt) {
			console.log('Creating check deadline event')
			await this.createCheckDeadlineEvent(work)
		}

		if (work.solvedAt) {
			console.log('Creating work made event')
			await this.createWorkMadeEvent(work)
		}

		if (work.checkedAt) {
			console.log('Creating work checked event')
			await this.createWorkCheckedEvent(work)
		}
	}

	public async updateDeadlineFromWork(
		work: AssignedWork
	): Promise<void> {
		const type = work.solveDeadlineShifted
			? 'student-deadline'
			: 'mentor-deadline'

		const newDate = work.solveDeadlineShifted
			? work.solveDeadlineAt
			: work.checkDeadlineAt

		const event = await this.calenderEventRepository.findOne({
			assignedWork: {
				id: work.id,
			},
			type,
		})

		if (!event || !newDate) {
			return
		}

		event.date = newDate
		event.description =
			event.description + ' (Дедлайн сдивнут на эту дату)'

		await this.calenderEventRepository.update(event)
	}

	public async get(
		username: User['username'],
		pagination?: Pagination
	): Promise<CalenderEvent[]> {
		const events = this.calenderEventRepository.find(
			{
				username,
			},
			undefined,
			pagination
		)

		this.storeRequestMeta(
			this.calenderEventRepository,
			undefined,
			undefined,
			pagination
		)

		return events
	}

	public async getOne(
		id: CalenderEvent['id'],
		username: User['username']
	): Promise<CalenderEvent | null> {
		const event = await this.calenderEventRepository.findOne({ id })

		if (event && event?.username !== username) {
			throw new UnauthorizedError()
		}

		return event
	}

	public async update(
		id: CalenderEvent['id'],
		event: Partial<CalenderEvent>,
		username: User['username']
	): Promise<void> {
		const foundEvent = await this.calenderEventRepository.findOne({
			id,
		})

		if (foundEvent && foundEvent?.username !== username) {
			throw new UnauthorizedError()
		}

		await this.calenderEventRepository.update({ ...event, id })
	}

	public async delete(
		id: CalenderEvent['id'],
		username: User['username']
	): Promise<void> {
		const foundEvent = await this.calenderEventRepository.findOne({
			id,
		})

		if (foundEvent && foundEvent?.username !== username) {
			throw new UnauthorizedError()
		}

		await this.calenderEventRepository.delete(id)
	}

	private async createSolveDeadlineEvent(
		work: AssignedWork
	): Promise<void> {
		const a = await this.calenderEventRepository.create({
			title: 'Дедлайн по работе',
			description: `Работа: ${work.work.name}`,
			date: work.solveDeadlineAt!,
			url: `/assigned-works/${work.id}/solve`,
			visibility: 'all',
			type: 'student-deadline',
			username: work.student!.username,
			assignedWork: work,
		} as CalenderEvent)

		console.log(a)
	}

	private async createCheckDeadlineEvent(
		work: AssignedWork
	): Promise<void> {
		await Promise.all(
			(work.mentors || []).map((mentor) => {
				return this.calenderEventRepository.create({
					title: 'Дедлайн по проверке работы',
					description: `Работа: ${work.work.name}`,
					date: work.checkDeadlineAt!,
					url: `/assigned-works/${work.id}/check`,
					visibility: 'private',
					type: 'mentor-deadline',
					username: mentor.username,
					assignedWork: work,
				} as CalenderEvent)
			})
		)
	}

	private async createWorkMadeEvent(work: AssignedWork): Promise<void> {
		await this.calenderEventRepository.create({
			title: 'Работа сдана',
			description: `Работа: ${work.work.name}`,
			date: work.solvedAt!,
			url: `/assigned-works/${work.id}/read`,
			visibility: 'all',
			type: 'work-made',
			username: work.student!.username,
			assignedWork: work,
		} as CalenderEvent)
	}

	private async createWorkCheckedEvent(
		work: AssignedWork
	): Promise<void> {
		await Promise.all(
			(work.mentors || []).map((mentor) => {
				return this.calenderEventRepository.create({
					title: 'Работа проверена',
					description: `Работа: ${work.work.name}`,
					date: work.checkedAt!,
					url: `/assigned-works/${work.id}/read`,
					visibility: 'private',
					type: 'work-checked',
					username: mentor.username,
					assignedWork: work,
				} as CalenderEvent)
			})
		)
	}
}
