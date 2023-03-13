import template from './index.hbs';

import InputField from './field';

import Block from '../../utils/Block';

interface InterfaceProps {
  inputField: InputField,
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
