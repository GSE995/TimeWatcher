import axios from 'axios';
import ListResult from 'shared/types/ListResult';
import PageSize from 'shared/types/PageSize';
import { Timer, TimerDto } from '../types';
import { convertTimer } from '../utils';

const API_ROOT_URL = 'http://localhost:3001/api/v1/timer/';
export { API_ROOT_URL };

// service for work with TimeWatcherService
export default class TimersServie {
  static async get(id: number): Promise<Timer> {
    try {
      let result = await axios.get(API_ROOT_URL + id);
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async create(timer: Timer): Promise<Timer> {
    try {
      let result = await axios.post(API_ROOT_URL, timer);
      return convertTimer(result.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async save(timer: Timer): Promise<Timer> {
    try {
      let result = await axios.put(API_ROOT_URL + timer.id, timer);
      return convertTimer(result.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async remove(id: string): Promise<Boolean> {
    try {
      await axios.delete(API_ROOT_URL + id);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getList(pageSize: PageSize): Promise<ListResult<Timer>> {
    try {
      let result = await axios.get(API_ROOT_URL + 'list');
      result.data.data = result.data.data.map((el: TimerDto) => convertTimer(el));
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
