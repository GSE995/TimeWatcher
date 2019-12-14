export type TimerDTO = {
    id: string
    name: string
    value: string
    createDate: string
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

    static copy(timer: Timer) {
        return new Timer(timer.name)
    }

    static createFrom(dto: TimerDTO) {
        let timer = new Timer()
        timer.startDate = new Date(Date.parse(dto.createDate))
        timer.id = dto.id
        timer.name = dto.name
        return timer
    }
}
