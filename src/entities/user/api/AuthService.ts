import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import User from 'entities/user/types';
import { auth } from 'shared/config/firebase';
import { SuccessResult, ErrorResult } from 'shared/types/Result';

const API_URL = '';

export default class AuthService {
  static async signUp(credential: any | null) {
    try {
      let result = await createUserWithEmailAndPassword(auth, credential.email, credential.password);

      let user = new User(result.user?.email);
      user.id = result.user?.uid;

      return new SuccessResult(user);
    } catch (error: any) {
      return new ErrorResult(error.message);
    }
  }

  static async signIn({ email, password }: any) {
    try {
      let result = await signInWithEmailAndPassword(auth, email, password);

      let user = new User(result.user?.email);
      user.id = result.user?.uid;

      return new SuccessResult(user);
    } catch (error: any) {
      return new ErrorResult(error.message);
    }
  }
}
