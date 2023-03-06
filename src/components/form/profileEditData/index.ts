import template from './index.hbs';

import Block from '../../../utils/Block';
import Input from '../../input';
import InputField from '../../input/field';

import { FieldNames } from '../../../utils/data/checkValue';
import formSubmit from '../../../utils/eventHandlers/fromSubmit';
import inputBlur from '../../../utils/eventHandlers/inputBlur';

const inputs = [
  {
    title: 'Email',
    name: FieldNames.email,
    placeholder: 'email@mail.com',
    class: 'input-field_secondary'
  },
  {
    title: 'Login',
    name: FieldNames.login,
    placeholder: 'Ivan1234',
    class: 'input-field_secondary'
  },
  {
    title: 'First name',
    name: FieldNames.first_name,
    placeholder: 'Ivan',
    class: 'input-field_secondary'
  },
  {
    title: 'Second name',
    name: FieldNames.second_name,
    placeholder: 'Ivanov',
    class: 'input-field_secondary'
  },
  {
    title: 'Display name',
    name: FieldNames.display_name,
    placeholder: 'Ivan',
    class: 'input-field_secondary'
  },
  {
    title: 'Phone',
    name: FieldNames.phone,
    placeholder: '+7 (999) 999 99 99',
    class: 'input-field_secondary'
  }
];

interface InterfaceFormProfileEditProps {
  events: Record<string, (event: SubmitEvent) => void>,
}

class FormProfileEditData extends Block<InterfaceFormProfileEditProps> {
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

export default FormProfileEditData;
