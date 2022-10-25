import User from 'entities/user/types';
import firebase from 'shared/config/firebase';
import { Result, SuccessResult, ErrorResult } from 'shared/types/Result';

const API_URL = '';

export default class AuthService {
  static async signUp(credential: any | null) {
    try {
      let result = await firebase.auth().createUserWithEmailAndPassword(credential.email, credential.password);

      let user = new User(result.user?.email);
      user.id = result.user?.uid;

      return new SuccessResult(user);
    } catch (error: any) {
      return new ErrorResult(error.message);
    }
  }

  static async signIn({ email, password }: any) {
    try {
      let result = await firebase.auth().signInWithEmailAndPassword(email, password);

      let user = new User(result.user?.email);
      user.id = result.user?.uid;

      return new SuccessResult(user);
    } catch (error: any) {
      return new ErrorResult(error.message);
    }
  }
}
