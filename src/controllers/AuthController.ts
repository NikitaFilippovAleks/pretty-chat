import AuthAPI, { SigninDataInterface, SignupDataInterface } from '../api/AuthAPI';
import Router from '../navigation/Router';
import Routes from '../navigation/Routes';
import store from '../utils/Store';

class AuthController {
  private _api: AuthAPI;

  constructor() {
    this._api = new AuthAPI();

    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.logout = this.logout.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  async signup(data: SignupDataInterface) {
    store.set('user.isLoading', true);

    try {
      await this._api.signup(data);

      this.fetchUser();

      Router.go(Routes.Messenger);
    } catch (error) {
      store.set('user.error', (error as Error).message);
    }

    store.set('user.isLoading', false);
  }

  async signin(data: SigninDataInterface) {
    store.set('user.isLoading', true);

    try {
      await this._api.signin(data);

      this.fetchUser();

      Router.go(Routes.Messenger);
    } catch (error) {
      store.set('user.error', (error as Error).message);
    }

    store.set('user.isLoading', false);
  }

  async logout() {
    store.set('user.isLoading', true);

    try {
      await this._api.logout();

      store.set('user.data', undefined);

      Router.go(Routes.Index);
    } catch (error) {
      store.set('user.error', (error as Error).message);
    }

    store.set('user.isLoading', false);
  }

  async fetchUser() {
    store.set('user.isLoading', true);

    try {
      const user = await this._api.fetchUser();
      store.set('user.data', user);
    } catch (error) {
      store.set('user.error', (error as Error).message);
      store.set('user.isLoading', false);
      throw new Error(error as string);
    }

    store.set('user.isLoading', false);
  }
}

export default new AuthController();
