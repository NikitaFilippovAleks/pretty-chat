import template from './index.hbs';

import Block from '../../../utils/Block';

class Error500Page extends Block<Record<string, never>> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Error500Page;
