import template from '../index.hbs';

import ButtonMain from '../../button/main';
import Input from '../../input/text';
import InputField from '../../input/text/field';
import ModalsCloseButton from '../closeButton';

import ChatsController from '../../../controllers/ChatsController';
import ModalsController from '../../../controllers/ModalsController';

import { StateInterface, withStore } from '../../../utils/Store';
import Block from '../../../utils/Block';
import UserController from '../../../controllers/UserController';

interface InterfaceProps {
  title?: string;
  show?: boolean;
  userId: number;
  chatId: number;
}

type InterfacePropsWithStore = InterfaceProps & StateInterface['modals']['addUser'];

class ModalsAddUser extends Block<InterfacePropsWithStore> {
  init() {
    this.children.closeButton = new ModalsCloseButton({
      events: {
        click: () => {
          ModalsController.addUserToggler(false);
        }
      }
    });
    this.children.centerElement = this.createInput(this.props);

    this.children.mainButton = new ButtonMain({
      class: 'primary',
      text: 'Add',
      type: 'button',
      mb: '53px',
      events: {
        click: async () => {
          const user = await UserController.searchUser(this.children.centerElement.children.inputField.value);

          if (user.length === 0) {
            return ModalsController.addUserSerError('Such a user does not exist');
          }

          await ChatsController.addUser(this.props.chatId, [user[0].id]);

          return ModalsController.addUserToggler(false);
        }
      }
    });
  }

  componentDidUpdate() {
    this.children.centerElement = this.createInput(this.props);
    return true;
  }

  private createInput(props: InterfacePropsWithStore) {
    return new Input({
      error: props.error,
      inputField: new InputField({
        placeholder: 'user login',
        error: props.error
      })
    });
  }

  render() {
    return this.compile(template, { ...this.props, title: 'Add user' });
  }
}

export default withStore(state => ({
  ...state.modals.addUser,
  userId: state.user.data?.id,
  chatId: state.chats.selectedId
}))(ModalsAddUser);
