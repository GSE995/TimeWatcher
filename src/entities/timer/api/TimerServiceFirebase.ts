import ListResult from 'shared/types/ListResult';
import PageSize from 'shared/types/PageSize';
import firebase from 'shared/config/firebase';
import { convertTimer } from '../utils';
import type { CreateTimerDto, Timer, TimerDto } from '../types';

const db = firebase.firestore();
const collection = db.collection('timers');

const API_ROOT_URL = '/api/timer';
export { API_ROOT_URL };

// service for work with firebase
export default class TimersService {
  static async get(id: number): Promise<Timer> {
    const doc = await collection.doc(id.toString()).get();
    const timerDto = doc.data() as TimerDto;

    return convertTimer({ ...timerDto, id: doc.id });
  }

  static async create(timer: CreateTimerDto): Promise<Timer> {
    const docRef = await collection.add({
      name: timer.name,
      startDate: timer.startDate,
    });

    const doc = await docRef.get();
    const data = doc.data() as TimerDto;

    return convertTimer({
      ...data,
      id: doc.id,
    });
  }

  static async save(timer: Timer): Promise<Timer> {
    await collection.doc(timer.id).update({
      name: timer.name,
      endDate: timer.endDate || null,
      startDate: timer.startDate,
    });

    return timer;
  }

  static async remove(id: string): Promise<Boolean> {
    await collection.doc(id).delete();
    return true;
  }

  static async getList(pageSize: PageSize): Promise<ListResult<Timer>> {
    let querySnapshot = await collection.orderBy('endDate', 'desc').get();
    let timers: Timer[] = [];

    querySnapshot.forEach(doc => {
      let timerDto = doc.data() as TimerDto;
      timers.push(convertTimer({ ...timerDto, id: doc.id }));
    });

    return new ListResult<Timer>(timers, 1, pageSize);
  }
}
