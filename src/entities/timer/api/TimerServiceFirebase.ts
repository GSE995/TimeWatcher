import { collection, query, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';

import ListResult from 'shared/types/ListResult';
import PageSize from 'shared/types/PageSize';
import { firebaseDB } from 'shared/config/firebase';
import type { CreateTimerDto, FirebaseTimerType, Timer } from '../types';

const API_ROOT_URL = '/api/timer';
export { API_ROOT_URL };

// service for work with firebase
export default class TimersService {
  static async get(id: number): Promise<Timer> {
    const docRef = doc(firebaseDB, 'timers', id.toString());

    const docData = await getDoc(docRef);
    const timerDto = docData.data() as FirebaseTimerType;

    return convertTimer(id.toString(), timerDto);
  }

  static async create(timer: CreateTimerDto): Promise<Timer> {
    const timerCollection = collection(firebaseDB, 'timers');
    const docRef = await addDoc(timerCollection, timer);

    return { ...timer, id: docRef.id } as Timer;
  }

  static async save(timer: Timer): Promise<Timer> {
    const docRef = doc(firebaseDB, 'timers', timer.id);
    await updateDoc(docRef, {
      name: timer.name,
      endDate: timer.endDate || null,
      startDate: timer.startDate,
    });

    return timer;
  }

  static async remove(id: string): Promise<Boolean> {
    await deleteDoc(doc(firebaseDB, 'timers', id));
    return true;
  }

  static async getList(pageSize: PageSize): Promise<ListResult<Timer>> {
    const timerCollection = collection(firebaseDB, 'timers');
    const timerQuery = query(timerCollection, orderBy('endDate', 'desc'));

    const querySnapshot = await getDocs(timerQuery);
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
