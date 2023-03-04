import template from './index.hbs';

import FormsAuth from '../../components/form/auth';
import Navigation from '../../components/navigation';

import Block from '../../utils/Block';

class AuthorizationPage extends Block {
  init() {
    this.children.navigation = new Navigation();
    this.children.form = new FormsAuth();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default AuthorizationPage;
