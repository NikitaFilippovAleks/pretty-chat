import template from './index.hbs';

import Navigation from '../../../../components/navigation';

import Block from '../../../../utils/Block';
import FormProfileEditData from '../../../../components/form/profileEditData';

class ProfileEditDataPage extends Block<Record<string, never>> {
  init() {
    this.children.navigation = new Navigation();
    this.children.form = new FormProfileEditData();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfileEditDataPage;
