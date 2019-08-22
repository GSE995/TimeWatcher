import Timer from "../models/Timer"

// сервис заглушка
export default class TimersServie {

    static get(id){
        
    }

    static async create(timer){
        return new Promise((resolve, reject) => {
            timer.isNew = false
            timer.id = TimersServie.guid()
            resolve(timer)
        })
    }

    static save(timer){
        return timer
    }

    static remove(id){

    }

    static getList(){
        return new Promise((res, rej) => {
            res([
                new Timer('new', new Date(), 1),
                new Timer('new', new Date(), 2)
            ])
        })
    }

    static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}