import UserAPI from '../api/UserAPI';

import { InterfaceUser } from '../typings/types/User';

import store from '../utils/Store';

class UserController {
  private _api: UserAPI;

  constructor() {
    this._api = new UserAPI();

    this.updateProfile = this.updateProfile.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async updateProfile(data: Omit<InterfaceUser, 'id' | 'avatar'>) {
    store.set('user.isLoading', true);

    try {
      const updatedUser = await this._api.updateProfile(data);

      store.set('user.data', updatedUser);
    } catch (error) {
      store.set('user.error', (error as Error).message);
    }

    store.set('user.isLoading', false);
  }

  async updateAvatar(file: File) {
    store.set('user.isLoading', true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const updatedUser = await this._api.updateAvatar(formData);

      store.set('user.data', updatedUser);
    } catch (error) {
      store.set('user.error', (error as Error).message);
    }

    store.set('user.isLoading', false);
  }

  async updatePassword(data: { old_password: string, new_password: string }) {
    store.set('user.isLoading', true);

    try {
      await this._api.updatePassword({
        oldPassword: data.old_password,
        newPassword: data.new_password
      });
    } catch (error) {
      store.set('user.error', (error as Error).message);
    }

    store.set('user.isLoading', false);
  }

  async searchUser(login: string): Promise<InterfaceUser[]> {
    const response = await this._api.searchUser(login);

    return response;
  }
}

export default new UserController();
