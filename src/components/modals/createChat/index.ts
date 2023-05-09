import template from '../index.hbs';

import ButtonMain from '../../button/main';
import Input from '../../input/text';
import InputField from '../../input/text/field';
import ModalsCloseButton from '../closeButton';

import ChatsController from '../../../controllers/ChatsController';
import ModalsController from '../../../controllers/ModalsController';

import { StateInterface, withStore } from '../../../utils/Store';
import Block from '../../../utils/Block';

interface InterfaceProps {
  title?: string;
  show?: boolean;
}

class ModalsCreateChat extends Block<InterfaceProps & StateInterface['modals']['createChat']> {
  init() {
    this.children.ModalsCloseButton = new ModalsCloseButton({
      events: {
        click: () => {
          ModalsController.createChatToggler(false);
        }
      }
    });
    this.children.centerElement = new Input({
      inputField: new InputField({
        placeholder: 'Chat title'
      })
    });

    this.children.mainButton = new ButtonMain({
      class: 'primary',
      text: 'Create',
      type: 'button',
      mb: '53px',
      events: {
        click: async () => {
          await ChatsController.createChat(this.children.centerElement.children.inputField.value);
          await ChatsController.getChats();

          ModalsController.createChatToggler(false);
        }
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props, title: 'Create chat' });
  }
}

export default withStore(state => state.modals.createChat)(ModalsCreateChat);
