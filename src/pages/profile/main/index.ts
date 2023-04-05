import template from './index.hbs';

import ButtonBack from '../../../components/button/back';
import ButtonMain from '../../../components/button/main';
import ProfileAvatar from '../../../components/profile/avatar';
import ProfileInfoShow from '../../../components/profile/info/show';

import { InterfaceUser } from '../../../typings/types/User';

import Block from '../../../utils/Block';

import AuthController from '../../../controllers/AuthController';

import { StateInterface, withStore } from '../../../utils/Store';

import Router from '../../../navigation/Router';
import Routes from '../../../navigation/Routes';

const infos = [
  {
    title: 'Email',
    name: 'email'
  },
  {
    title: 'Login',
    name: 'login'
  },
  {
    title: 'First name',
    name: 'first_name'
  },
  {
    title: 'Second name',
    name: 'second_name'
  },
  {
    title: 'Display name',
    name: 'display_name'
  },
  {
    title: 'Phone',
    name: 'phone'
  }
];

class ProfileMainPage extends Block<StateInterface['user']> {
  init() {
    this.children.buttonBack = new ButtonBack({
      text: 'Profile',
      modifier: 'light',
      light: true,
      events: {
        click: () => {
          Router.back();
        }
      }
    });
    this.children.avatar = new ProfileAvatar({
      text: this.props.data!.login
    });

    this.children.infos = infos.map(item => (
      new ProfileInfoShow({
        title: item.title,
        data: this.props.data![(item.name as keyof InterfaceUser)] as string
      })
    ));

    this.children.buttonChangeData = new ButtonMain({
      text: 'Change data',
      class: 'primary',
      type: 'button',
      mb: '20px',
      events: {
        click: () => {
          Router.go(Routes.ProfileEdit);
        }
      }
    });
    this.children.buttonChangePassword = new ButtonMain({
      text: 'Change password',
      class: 'primary',
      type: 'button',
      mb: '20px',
      events: {
        click: () => {
          Router.go(Routes.PasswordEdit);
        }
      }
    });
    this.children.buttonLogout = new ButtonMain({
      text: 'Log out',
      class: 'danger',
      type: 'button',
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(state => state.user)(ProfileMainPage);
