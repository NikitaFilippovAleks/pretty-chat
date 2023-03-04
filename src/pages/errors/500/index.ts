import template from './index.hbs';

import Navigation from '../../../components/navigation';

import Block from '../../../utils/Block';

class Error500Page extends Block {
  init() {
    this.children.navigation = new Navigation();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Error500Page;
