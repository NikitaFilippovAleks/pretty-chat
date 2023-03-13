import template from './index.hbs';

import Block from '../../../utils/Block';
import Input from '../../input';
import InputField from '../../input/field';

import { FieldNames } from '../../../utils/data/checkValue';
import formSubmit from '../../../utils/eventHandlers/fromSubmit';
import inputBlur from '../../../utils/eventHandlers/inputBlur';

const inputs = [
  {
    mb: '20px',
    name: FieldNames.login,
    placeholder: 'Login',
    class: 'input-field_primary'
  },
  {
    mb: '60px',
    name: FieldNames.password,
    placeholder: 'Password',
    class: 'input-field_primary'
  }
];

interface InterfaceFormsAuthProps {
  events: Record<string, (event: SubmitEvent) => void>,
}

class FormsAuth extends Block<InterfaceFormsAuthProps, HTMLFormElement> {
  constructor() {
    super({
      events: {
        submit: (event: SubmitEvent) => {
          formSubmit<FormsAuth>(event, inputs, this);
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
              inputBlur<FormsAuth>(item, index, this);
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

export default FormsAuth;
