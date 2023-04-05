import template from './index.hbs';

import Input from '../../input/text';
import InputField from '../../input/text/field';

import { InterfaceUser } from '../../../typings/types/User';

import Block from '../../../utils/Block';
import { FieldNames } from '../../../utils/data/checkValue';
import formSubmit from '../../../utils/eventHandlers/fromSubmit';
import inputBlur from '../../../utils/eventHandlers/inputBlur';

import UserController from '../../../controllers/UserController';

import { StateInterface, withStore } from '../../../utils/Store';

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

class FormProfileEditData extends Block<InterfaceFormProfileEditProps & StateInterface> {
  constructor(props: InterfaceFormProfileEditProps & StateInterface) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          formSubmit(event, inputs, this, UserController.updateProfile);
        }
      }
    });
  }

  init() {
    this.children.inputs = inputs.map((item, index) => {
      const userData = this.props.user.data;

      return new Input({
        title: item.title,
        inputField: new InputField({
          name: item.name,
          placeholder: item.placeholder,
          class: item.class,
          value: userData ? userData[item.name as keyof InterfaceUser] : '',
          events: {
            blur: () => {
              inputBlur(item, index, this);
            }
          }
        })
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(state => ({ user: state.user }))(FormProfileEditData);
