export default class Timer {
    id
    name = ''
    value = new Date(2019, 1, 1, 0, 0, 0)
    idNew

    constructor(name = '', value, id){
        this.name = name
        this.value = value || new Date(2019, 1, 1, 0, 0, 0)
        this.id = id
        this.createDate = new Date()
    }

    copy(){
        return new Timer(this.name, new Date(this.value))
    }
}