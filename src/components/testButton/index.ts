import template from './index.hbs';

import Block from '../../utils/Block';

class TestButton extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export default TestButton;
