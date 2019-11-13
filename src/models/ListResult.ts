import PageSize from "./PageSize"

export default class ListResult<T> {
    total: number
    pageSize: PageSize
    data: T[]

    constructor(data: T[], total: number, pageSize: PageSize){
        this.data = data
        this.total = total
        this.pageSize = pageSize
    }
}