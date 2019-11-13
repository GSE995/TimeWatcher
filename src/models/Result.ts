export default class Result<T> {
    public success!: boolean
    public message: string = ''
    public data!: T
}
