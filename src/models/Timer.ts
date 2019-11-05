export default class Timer {
    public id!: string
    public name: string
    public value: Date = new Date(2019, 1, 1, 0, 0, 0)
    public isNew!: boolean
    public projectId!: number
    private createDate: Date

    constructor(name: string = '', value: Date) {
        this.name = name
        this.value = value || new Date(2019, 1, 1, 0, 0, 0)
        this.createDate = new Date()
    }

    copy() {
        return new Timer(this.name, new Date(this.value))
    }
}
