import template from './index.hbs';

import ButtonMain from '../../components/button/main';
import FormRegistration from '../../components/form/registration';

import Block from '../../utils/Block';

import { withStore } from '../../utils/Store';

import Router from '../../navigation/Router';
import Routes from '../../navigation/Routes';

class RegistrationPage extends Block<Record<string, never>> {
  init() {
    this.children.form = new FormRegistration({});
    this.children.buttonMain = new ButtonMain({
      class: 'secondary',
      mb: '10px',
      type: 'button',
      text: 'Sign in',
      events: {
        click: () => Router.go(Routes.Index)
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(state => state.user)(RegistrationPage);
