export default class PageSize {
    start: number
    limit: number

    constructor(start: number = 0, limit: number = 25) {
        this.start = start
        this.limit = limit
    }
}
