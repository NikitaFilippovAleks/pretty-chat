import template from './index.hbs';

import FormProfileEditPassword from '../../../../components/form/profileEditPassword';
import Navigation from '../../../../components/navigation';

import Block from '../../../../utils/Block';

class ProfileEditPasswordPage extends Block {
  init() {
    this.children.navigation = new Navigation();
    this.children.form = new FormProfileEditPassword();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfileEditPasswordPage;
