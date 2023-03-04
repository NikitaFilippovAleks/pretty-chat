import template from './index.hbs';

import Navigation from '../../../components/navigation';

import Block from '../../../utils/Block';

class ProfileMainPage extends Block<Record<string, never>> {
  init() {
    this.children.navigation = new Navigation();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfileMainPage;
