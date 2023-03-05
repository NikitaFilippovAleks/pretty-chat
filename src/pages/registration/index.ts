import template from './index.hbs';

import Navigation from '../../components/navigation';

import Block from '../../utils/Block';
import FormRegistration from '../../components/form/registration';

class RegistrationPage extends Block<Record<string, never>> {
  init() {
    this.children.navigation = new Navigation();
    this.children.form = new FormRegistration();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default RegistrationPage;
