export type TimerDTO = {
    id: number
    name: string
    value: string
    createDate: string
}

export default class Timer {
    public id: number
    public name: string
    public value: Date = new Date(2019, 1, 1, 0, 0, 0)
    private createDate: Date

    constructor(name: string = '') {
        this.name = name
        this.value = new Date(2019, 1, 1, 0, 0, 0)
        this.createDate = new Date()
        this.id = 0
    }

    static copy(timer: Timer) {
        return new Timer(timer.name)
    }

    static createFrom(dto: TimerDTO){
        let timer = new Timer()
        timer.createDate = new Date(Date.parse(dto.createDate))
        timer.id = dto.id
        timer.name = dto.name
        return timer
    }
}
