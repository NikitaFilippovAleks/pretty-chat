import { InterfacePasswordsData, InterfaceUser } from '../typings/types/User';

import BaseAPI from './BaseAPI';

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateProfile(data: Omit<InterfaceUser, 'id' | 'avatar'>) {
    return this.http.put<InterfaceUser>('/profile', data);
  }

  updateAvatar(file: FormData) {
    return this.http.put<InterfaceUser>('/profile/avatar', file);
  }

  updatePassword(data: InterfacePasswordsData) {
    return this.http.put('/password', data);
  }

  searchUser(login: string): Promise<InterfaceUser[]> {
    return this.http.post('/search', { login });
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}
