import template from './index.hbs';

import Block from '../../../utils/Block';

interface InterfaceProps {
  inputField: Block<any>,
  mb?: string,
  title?: string,
  error?: string
}

class Input extends Block<InterfaceProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
