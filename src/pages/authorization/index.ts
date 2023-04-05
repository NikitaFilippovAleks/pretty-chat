import template from './index.hbs';

import ButtonMain from '../../components/button/main';
import FormsAuth from '../../components/form/auth';

import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';

import Router from '../../navigation/Router';
import Routes from '../../navigation/Routes';

class AuthorizationPage extends Block<Record<string, never>> {
  init() {
    this.children.form = new FormsAuth({});
    this.children.buttonMain = new ButtonMain({
      class: 'secondary',
      mb: '15px',
      type: 'button',
      text: 'Sign up',
      events: {
        click: () => Router.go(Routes.Register)
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(state => state.user)(AuthorizationPage);
