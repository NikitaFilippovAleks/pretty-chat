import template from './index.hbs';

import Block from '../../../utils/Block';
import Input from '../../input';
import InputField from '../../input/field';

import checkInputValue from '../../../utils/data/checkInputValue';
import { FieldNames } from '../../../utils/data/isValid';

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

class FormProfileEditPassword extends Block {
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

export default FormProfileEditPassword;
