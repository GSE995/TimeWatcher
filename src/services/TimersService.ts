import Timer, {ITimerDTO} from '../models/Timer'
import Result from '../models/Result'
import ListResult from '../models/ListResult'
import PageSize from '../models/PageSize'

const API_ROOT_URL = '/api/timer'
export { API_ROOT_URL }
// сервис заглушка
export default class TimersServie {
    
    static get(id: number): Promise<Result<Timer>> {
        return new Promise((resolve, reject) => {
            resolve({
                data: new Timer('newe'),
                success: true,
                message: '',
            })
        })
    }

    static async create(timer: Timer): Promise<Timer> {
        const params: RequestInit = {
            method: 'POST',
            body: JSON.stringify(timer)
        }
        let response = await fetch(`${API_ROOT_URL}`, params)
        let {data} = await response.json()
        return Timer.createFrom(data)
    }

    static async save(timer: Timer): Promise<Timer> {
        const params: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(timer)
        }
        return fetch(`${API_ROOT_URL}`, params)
                                .then(res => res.json())
        
    }

    static async remove(id: number): Promise<Result<any>> {
        const params: RequestInit = {
            method: 'DELETE'
        }
        return fetch(`${API_ROOT_URL}/${id}`, params)
                                .then(res => res.json())
    }

    static async getList(pageSize: PageSize): Promise<ListResult<Timer>> {
        let response = await fetch(`${API_ROOT_URL}/list`)
        let {data, total} = await response.json()
        let timers = data.map((el: ITimerDTO ) => Timer.createFrom(el))
        return new ListResult(timers, total, pageSize)
    }
}
