import template from './index.hbs';

import Block from '../../../utils/Block';
import Input from '../../input';
import InputField from '../../input/field';

import { FieldNames } from '../../../utils/data/checkValue';
import formSubmit from '../../../utils/eventHandlers/fromSubmit';
import inputBlur from '../../../utils/eventHandlers/inputBlur';

const inputs = [
  {
    title: 'Old password',
    name: FieldNames.old_password,
    placeholder: 'password',
    class: 'input-field_secondary'
  },
  {
    title: 'New password',
    name: FieldNames.new_password,
    placeholder: 'password',
    class: 'input-field_secondary'
  },
  {
    title: 'Repeat new password',
    name: FieldNames.repeated_new_password,
    placeholder: 'password',
    class: 'input-field_secondary'
  }
];

interface InterfaceFormProfileEditPasswordProps {
  events: Record<string, (event: SubmitEvent) => void>
}

class FormProfileEditPassword extends Block<InterfaceFormProfileEditPasswordProps> {
  constructor() {
    super({
      events: {
        submit: (event: SubmitEvent) => {
          formSubmit(event, inputs, this);
        }
      }
    });
  }

  init() {
    this.children.inputs = inputs.map((item, index) => (
      new Input({
        title: item.title,
        inputField: new InputField({
          name: item.name,
          placeholder: item.placeholder,
          class: item.class,
          events: {
            blur: () => {
              inputBlur(item, index, this);
            }
          }
        })
      })
    ));
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default FormProfileEditPassword;
