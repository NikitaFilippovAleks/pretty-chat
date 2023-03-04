import template from './index.hbs';

import Block from '../../../utils/Block';
import Input from '../../input';
import InputField from '../../input/field';

import checkInputValue from '../../../utils/data/checkInputValue';
import { FieldNames } from '../../../utils/data/isValid';

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

class FormProfileEditData extends Block {
  constructor() {
    super({
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();

          const data: Record<string, unknown> = {};
          let correct = true;

          inputs.forEach((item, index) => {
            const input = this.children.inputs[index];
            const { inputField } = this.children.inputs[index].children;

            data[item.name] = inputField.value;

            correct = checkInputValue(input, inputField, item.name);
          });

          /* eslint-disable no-console */
          if (!correct) console.log('Invalid fields');
          else console.log('data:', data);
          /* eslint-enable no-console */
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
              const input = this.children.inputs[index];
              const { inputField } = this.children.inputs[index].children;

              checkInputValue(input, inputField, item.name);
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
