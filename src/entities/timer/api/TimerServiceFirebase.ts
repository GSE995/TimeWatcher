import ListResult from 'shared/types/ListResult';
import PageSize from 'shared/types/PageSize';
import firebase from 'shared/config/firebase';
import type { CreateTimerDto, FirebaseTimerType, Timer } from '../types';

const db = firebase.firestore();
const collection = db.collection('timers');

const API_ROOT_URL = '/api/timer';
export { API_ROOT_URL };

// service for work with firebase
export default class TimersService {
  static async get(id: number): Promise<Timer> {
    const doc = await collection.doc(id.toString()).get();
    const timerDto = doc.data() as FirebaseTimerType;

    return convertTimer(doc.id, timerDto);
  }

  static async create(timer: CreateTimerDto): Promise<Timer> {
    const docRef = await collection.add({
      name: timer.name,
      startDate: timer.startDate,
    });

    const doc = await docRef.get();
    const data = doc.data() as FirebaseTimerType;

    return convertTimer(doc.id, data);
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
      let timerDto = doc.data() as FirebaseTimerType;
      timers.push(convertTimer(doc.id, timerDto));
    });

    return new ListResult<Timer>(timers, 1, pageSize);
  }
}

function convertTimer(id: string, timerDto: FirebaseTimerType) {
  return {
    id,
    startDate: new Date(timerDto.startDate.seconds * 1000),
    endDate: timerDto.endDate && new Date(timerDto.endDate.seconds * 1000),
    name: timerDto.name || '',
  };
}
