import template from './index.hbs';

import Block from '../../../../utils/Block';

interface InterfaceInputFileFieldProps {
  events: {
    change: (event: Event) => void;
  }
}

class InputFileField extends Block<InterfaceInputFileFieldProps> {
  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default InputFileField;
