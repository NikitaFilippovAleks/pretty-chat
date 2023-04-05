import { ChatsAPI } from '../api/ChatsAPI';

import { InterfaceUser } from '../typings/types/User';

import MessagesController from './MessagesController';

import store from '../utils/Store';

class ChatsController {
  private _api: ChatsAPI;

  constructor() {
    this._api = new ChatsAPI();
  }

  async getChats() {
    store.set('chats.list.isLoading', true);

    try {
      const chatsList = await this._api.read();

      chatsList.map(async (chat) => {
        const token = await this.getToken(chat.id);

        await MessagesController.connect(chat.id, token);
      });

      store.set('chats.list.data', chatsList);
    } catch (error) {
      store.set('chats.list.error', (error as Error).message);
    }

    store.set('chats.list.isLoading', false);
  }

  getToken(id: number) {
    return this._api.getToken(id);
  }

  async createChat(title: string) {
    store.set('modals.createChat.isLoading', true);

    try {
      await this._api.create(title);
    } catch (error) {
      store.set('modals.createChat.error', (error as Error).message);
    }

    store.set('modals.createChat.isLoading', false);
  }

  selectChat(id: number) {
    store.set('chats.selectedId', id);
  }

  async getUsers(id: number): Promise<InterfaceUser[]> {
    return this._api.getUsers(id);
  }

  async addUser(id: number, users: number[]) {
    store.set('modals.addUser.isLoading', true);

    try {
      await this._api.addUsers(id, users);
    } catch (error) {
      store.set('modals.addUser.error', (error as Error).message);
    }

    store.set('modals.addUser.isLoading', false);
  }

  async deleteUser(id: number, users: number[]) {
    store.set('modals.deleteUser.isLoading', true);

    try {
      await this._api.deleteUsers(id, users);
    } catch (error) {
      store.set('modals.deleteUser.error', (error as Error).message);
    }

    store.set('modals.deleteUser.isLoading', false);
  }
}

export default new ChatsController();
