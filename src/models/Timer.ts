import moment from "moment"

export type TimerDTO = {
    id: string
    name: string
    value: string
    startDate: string,
    endDate: string
}

export default class Timer {
    public id: string
    public name: string
    public endDate?: Date | null
    public startDate: Date = new Date()

    constructor(name: string = '') {
        this.name = name
        this.id = ''
    }

    public getValue(): Date {
        let start = this.startDate
        let end = this.endDate || new Date()
        let diff = +end - +start
    
        return new Date(diff)
    }

    static copy(timer: Timer) {
        let copy = new Timer(timer.name)
        copy.endDate = timer.endDate ? new Date(timer.endDate) : null
        copy.startDate = new Date(timer.startDate)
        return copy
    }

    static createFrom(dto: TimerDTO) {
        let timer = new Timer()
        timer.startDate = dto.startDate ? moment(dto.startDate).toDate() : new Date()
        timer.endDate = dto.endDate ? moment(dto.endDate).toDate() : null
        timer.id = dto.id
        timer.name = dto.name
        return timer
    }
}
