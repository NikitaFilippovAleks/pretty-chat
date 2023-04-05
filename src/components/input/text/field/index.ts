import template from './index.hbs';

import Block from '../../../../utils/Block';
import { FieldNames } from '../../../../utils/data/checkValue';
import { withStore } from '../../../../utils/Store';

export interface InterfaceInputFieldsProps {
  name: FieldNames,
  placeholder: string,
  class: string,
  events: Record<string, () => void>,
  error?: string,
  value?: string
}

export class InputField extends Block<InterfaceInputFieldsProps> {
  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(state => state.user)(InputField);
