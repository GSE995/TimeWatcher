export default class User {
  id?: string;
  email: string | null | undefined;

  constructor(email: string | null | undefined) {
    this.email = email;
  }
}
