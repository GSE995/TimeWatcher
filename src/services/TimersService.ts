import axios from 'axios'
import Timer from '../models/Timer'
import { SuccessResult, ErrorResult } from '../models/Result'
import ListResult from '../models/ListResult'
import PageSize from '../models/PageSize'

const API_ROOT_URL = 'http://localhost:3001/api/v1/timer/'
export { API_ROOT_URL }

// service for work with TimeWatcherService
export default class TimersServie<T> {
  static async get(id: number): Promise<SuccessResult<Timer> | ErrorResult> {
    try {
      let result = await axios.get(API_ROOT_URL + id)
      return new SuccessResult(result.data)
    } catch (error) {
      console.log(error)
      return new ErrorResult(error)
    }
  }

  static async create(
    timer: Timer
  ): Promise<SuccessResult<Timer> | ErrorResult> {
    try {
      let result = await axios.post(API_ROOT_URL, timer)
      return new SuccessResult(Timer.createFrom(result.data))
    } catch (error) {
      console.log(error)
      return new ErrorResult(error)
    }
  }

  static async save(timer: Timer): Promise<SuccessResult<Timer> | ErrorResult> {
    try {
      let result = await axios.put(API_ROOT_URL + timer.id, timer)
      return new SuccessResult(Timer.createFrom(result.data))
    } catch (error) {
      console.log(error)
      return new ErrorResult(error)
    }
  }

  static async remove(
    id: string
  ): Promise<SuccessResult<Boolean> | ErrorResult> {
    try {
      let result = await axios.delete(API_ROOT_URL + id)
      return new SuccessResult(true)
    } catch (error) {
      console.log(error)
      return new ErrorResult(error)
    }
  }

  static async getList(
    pageSize: PageSize
  ): Promise<SuccessResult<ListResult<Timer>> | ErrorResult> {
    try {
      let result = await axios.get(API_ROOT_URL + 'list')
      return new SuccessResult(result.data)
    } catch (error) {
      console.log(error)
      return new ErrorResult(error)
    }
  }
}
