import template from './index.hbs';

import ModalsEditChatsButton from './button';

import IconCreateChat from '../../../../static/icons/chats/IconCreateChat.svg';
import IconCross from '../../../../static/icons/chats/IconCross.svg';
import IconPlus from '../../../../static/icons/chats/IconPlus.svg';

import ModalsController from '../../../controllers/ModalsController';

import { StateInterface, withStore } from '../../../utils/Store';
import Block from '../../../utils/Block';
import ModalsEditChatsCloseButton from './closeButton';

interface InterfaceProps {
  IconCreateChat?: SVGElement;
  IconCross?: SVGElement;
  IconPlus?: SVGElement;
}

class ModalsEditChats extends Block<InterfaceProps & StateInterface['modals']['editChats']> {
  init() {
    this.children.createChatButton = new ModalsEditChatsButton({
      title: 'Create chat',
      icon: IconCreateChat,
      events: {
        click: () => {
          ModalsController.editChatsToggler(false);
          ModalsController.createChatToggler(true);
        }
      }
    });

    this.children.addUserButton = new ModalsEditChatsButton({
      title: 'Add user',
      icon: IconPlus,
      events: {
        click: () => {
          ModalsController.editChatsToggler(false);
          ModalsController.addUserToggler(true);
        }
      }
    });

    this.children.deleteUserButton = new ModalsEditChatsButton({
      title: 'Delete user',
      icon: IconCross,
      events: {
        click: () => {
          ModalsController.editChatsToggler(false);
          ModalsController.deleteUserToggler(true);
        }
      }
    });

    this.children.closeButton = new ModalsEditChatsCloseButton({
      events: {
        click: () => {
          ModalsController.editChatsToggler(false);
        }
      }
    });
  }

  render() {
    return this.compile(template, {
      ...this.props, IconCreateChat, IconCross, IconPlus
    });
  }
}

export default withStore(state => ({ ...state.modals.editChats, ...state.chats }))(ModalsEditChats);
