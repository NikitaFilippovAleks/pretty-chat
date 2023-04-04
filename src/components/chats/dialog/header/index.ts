import template from './index.hbs';

import ChatsDialogHeaderButton from './button';
import ModalsEditChats from '../../../modals/editChats';

import ModalsController from '../../../../controllers/ModalsController';

import { StateInterface, withStore } from '../../../../utils/Store';
import Block from '../../../../utils/Block';

interface InterfaceChatsDialogHeaderProps {
  imageSrc: string;
  firstName: string;
  secondName: string;
}

class ChatsDialogHeader extends Block<InterfaceChatsDialogHeaderProps & StateInterface['modals']['editChats']> {
  init() {
    this.children.modalsEditChats = new ModalsEditChats({});
    this.children.chatsDialogHeaderButton = new ChatsDialogHeaderButton({
      events: {
        click: () => {
          ModalsController.editChatsToggler(!this.props.show);
        }
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default withStore(state => state.modals.editChats)(ChatsDialogHeader);
