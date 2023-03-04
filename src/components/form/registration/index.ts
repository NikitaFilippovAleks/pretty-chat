import template from './index.hbs';

import Block from '../../../utils/Block';
import Input from '../../input';
import InputField from '../../input/field';

import checkInputValue from '../../../utils/data/checkInputValue';
import { FieldNames } from '../../../utils/data/isValid';

const inputs = [
  {
    mb: '20px',
    name: FieldNames.first_name,
    placeholder: 'First name',
    class: 'input-field_primary'
  },
  {
    mb: '20px',
    name: FieldNames.second_name,
    placeholder: 'Second name',
    class: 'input-field_primary'
  },
  {
    mb: '20px',
    name: FieldNames.login,
    placeholder: 'Login',
    class: 'input-field_primary'
  },
  {
    mb: '20px',
    name: FieldNames.email,
    placeholder: 'Email',
    class: 'input-field_primary'
  },
  {
    mb: '20px',
    name: FieldNames.phone,
    placeholder: 'Phone',
    class: 'input-field_primary'
  },
  {
    mb: '20px',
    name: FieldNames.password,
    placeholder: 'Password',
    class: 'input-field_primary'
  },
  {
    mb: '20px',
    name: FieldNames.confirm_password,
    placeholder: 'Confirm password',
    class: 'input-field_primary'
  }
];

class FormRegistration extends Block {
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
        mb: item.mb,
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

export default FormRegistration;
