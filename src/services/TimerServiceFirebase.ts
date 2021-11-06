import Timer from '../models/Timer';
import ListResult from '../models/ListResult';
import PageSize from '../models/PageSize';
import firebase from '../config/firebase';

const db = firebase.firestore();
const collection = db.collection('timers');

const API_ROOT_URL = '/api/timer';
export { API_ROOT_URL };

// service for work with firebase
export default class TimersService {
  static async get(id: number): Promise<ListResult<Timer>> {
    const res: any = await collection.doc(id.toString()).get();
    let serverTimer = new Timer(res.name);
    serverTimer.startDate = res.startDate;
    serverTimer.endDate = res.endDate;
    serverTimer.id = res.id;

    return res;
  }

  static async create(timer: Timer): Promise<Timer> {
    let timerForSave = {
      name: timer.name,
      endDate: timer.endDate || null,
      startDate: timer.startDate,
    };
    console.log(timerForSave);
    let docRef: any = await collection.add(timerForSave);
    let serverTimer = new Timer(timer.name);
    serverTimer.startDate = timer.startDate;
    serverTimer.id = docRef.id;
    console.log(serverTimer);
    return serverTimer;
  }

  static async save(timer: Timer): Promise<Timer> {
    let timerForSave = {
      name: timer.name,
      endDate: timer.endDate || null,
      startDate: timer.startDate,
    };
    await collection.doc(timer.id).update(timerForSave);

    let serverTimer = new Timer(timer.name);
    serverTimer.startDate = timer.startDate;
    serverTimer.endDate = timer.endDate;
    serverTimer.id = timer.id;

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
      let data = doc.data();
      let timer = new Timer(data.name);
      timer.id = doc.id;
      timer.startDate = data.startDate.toDate();
      timer.endDate = data.endDate ? data.endDate.toDate() : null;
      timers.push(timer);
    });

    return new ListResult<Timer>(timers, 1, pageSize);
  }
}
