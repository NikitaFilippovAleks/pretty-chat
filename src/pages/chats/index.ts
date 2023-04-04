import template from './index.hbs';

import ChatsDialog from '../../components/chats/dialog';
import ChatsList from '../../components/chats/list';
import ModalsAddUser from '../../components/modals/addUser';
import ModalsCreateChat from '../../components/modals/createChat';
import ModalsDeleteUser from '../../components/modals/deleteUser';

import Block from '../../utils/Block';
import ChatsController from '../../controllers/ChatsController';

interface InterfaceChatsPageProps {
  IconArrowForward: SVGElement
}

class ChatsPage extends Block<InterfaceChatsPageProps> {
  init() {
    this.children.chatsDialog = new ChatsDialog({});
    this.children.chatsList = new ChatsList({ isLoading: true });

    this.children.modalsCreateChat = new ModalsCreateChat({});
    this.children.modalsAddUser = new ModalsAddUser({});
    this.children.modalsDeleteUser = new ModalsDeleteUser({});

    ChatsController.getChats().finally(() => {
      this.children.chatsList.setProps({ isLoading: false });
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ChatsPage;
