import template from './index.hbs';

import Block from '../../../utils/Block';
import { FieldNames } from '../../../utils/data/checkValue';

export interface InterfaceInputFieldsProps {
  name: FieldNames,
  placeholder: string,
  class: string,
  events: Record<string, () => void>,
  error?: string,
  value?: string
}

class InputField extends Block<InterfaceInputFieldsProps> {
  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default InputField;
