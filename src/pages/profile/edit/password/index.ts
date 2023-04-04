import template from './index.hbs';

import ButtonBack from '../../../../components/button/back';
import FormProfileEditPassword from '../../../../components/form/profileEditPassword';

import Block from '../../../../utils/Block';

import Router from '../../../../navigation/Router';

class ProfileEditPasswordPage extends Block<Record<string, never>> {
  init() {
    this.children.form = new FormProfileEditPassword({});
    this.children.buttonBack = new ButtonBack({
      text: '',
      modifier: 'light',
      light: true,
      events: {
        click: () => {
          Router.back();
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfileEditPasswordPage;
