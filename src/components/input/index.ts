import template from './index.hbs';

import Block from '../../utils/Block';

class Input extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
