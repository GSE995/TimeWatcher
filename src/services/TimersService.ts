import axios from 'axios'
import Timer, { TimerDTO } from '../models/Timer'
import {Result, SuccessResult, ErrorResult} from '../models/Result'
import ListResult from '../models/ListResult'
import PageSize from '../models/PageSize'

const API_ROOT_URL = '/api/timer'
export { API_ROOT_URL }

// сервис заглушка
export default class TimersServie<T> {

    static async get(id: number): Promise<SuccessResult<Timer> | ErrorResult> {
        try {
            let {data} = await axios.get(`${API_ROOT_URL}/${id}`)
            return new SuccessResult(Timer.createFrom(data))
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }

    static async create(timer: Timer): Promise<SuccessResult<Timer> | ErrorResult> {
        try {
            let {data} = await axios.post(`${API_ROOT_URL}`, timer)
            return new SuccessResult(Timer.createFrom(data))
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }

    static async save(timer: Timer): Promise<SuccessResult<Timer> | ErrorResult> {
        try {
            let response  = await axios.put(`${API_ROOT_URL}`, timer)
            return new SuccessResult(timer)
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }

    static async remove(id: number): Promise<SuccessResult<Boolean> | ErrorResult> {
        try {
            let response = await axios.delete(`${API_ROOT_URL}/${id}`)
            return new SuccessResult(true)
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }

    static async getList(pageSize: PageSize): Promise<SuccessResult<ListResult<Timer[]>> | ErrorResult> {
        try {
            let {result} = await axios.get(`${API_ROOT_URL}/list`)
            let listResult = new ListResult<Timer[]>(result.data, result.total, pageSize)
            return new SuccessResult(listResult)
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }
}
