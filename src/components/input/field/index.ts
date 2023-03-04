import template from './index.hbs';

import Block from '../../../utils/Block';

class InputField extends Block {
  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default InputField;
