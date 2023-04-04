import template from './index.hbs';

import Block from '../../../utils/Block';
import Input from '../../input/text';
import InputField from '../../input/text/field';

import { StateInterface, withStore } from '../../../utils/Store';
import { FieldNames } from '../../../utils/data/checkValue';
import formSubmit from '../../../utils/eventHandlers/fromSubmit';
import inputBlur from '../../../utils/eventHandlers/inputBlur';

import AuthController from '../../../controllers/AuthController';

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

export interface InterfaceFormRegistrationProps {
  events: Record<string, (event: SubmitEvent) => void>,
}

class FormRegistration extends Block<InterfaceFormRegistrationProps> {
  constructor() {
    super({
      events: {
        submit: (event: SubmitEvent) => {
          formSubmit(event, inputs, this, AuthController.signup);
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

export default withStore((state) => {
  const userData = state.user?.data || {};

  userData.isLoading = (userData as StateInterface).user?.isLoading;

  return userData;
})(FormRegistration);
