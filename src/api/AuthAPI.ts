import { InterfaceUser } from '../typings/types/User';

import BaseAPI from './BaseAPI';

export interface SignupDataInterface {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SigninDataInterface {
  login: string;
  password: string;
}

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: SignupDataInterface) {
    return this.http.post('/signup', data);
  }

  signin(data: SigninDataInterface) {
    return this.http.post('/signin', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  fetchUser(): Promise<InterfaceUser> {
    return this.http.get<InterfaceUser>('/user');
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}
