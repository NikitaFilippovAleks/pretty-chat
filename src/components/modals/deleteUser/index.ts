import template from '../index.hbs';

import ButtonMain from '../../button/main';
import ModalsCloseButton from '../closeButton';
import ModalsDeleteUserList from './list';
import ModalsDeleteUserListItem from './list/item';

import { InterfaceUser } from '../../../typings/types/User';

import ChatsController from '../../../controllers/ChatsController';
import ModalsController from '../../../controllers/ModalsController';

import store, { StateInterface, withStore } from '../../../utils/Store';
import Block from '../../../utils/Block';

interface InterfaceProps {
  title?: string;
  show?: boolean;
  userId: number;
  chatId: number;
  modalsList?: boolean;
}

type InterfacePropsWithStore = InterfaceProps & StateInterface['modals']['deleteUser'] & { users: InterfaceUser[] };

class ModalsDeleteUser extends Block<InterfacePropsWithStore> {
  constructor(props: InterfacePropsWithStore) {
    super({ ...props, modalsList: true });
  }

  init() {
    this.children.closeButton = new ModalsCloseButton({
      events: {
        click: () => {
          ModalsController.deleteUserToggler(false);
        }
      }
    });

    this.children.centerElement = this.createList(this.props);

    this.children.mainButton = new ButtonMain({
      class: 'primary',
      text: 'Delete',
      type: 'button',
      mb: '53px',
      events: {
        click: async () => {
          if (!this.props.selectedUserId) return;

          store.set('modals.deleteUser.isLoading', true);

          await ChatsController.deleteUser(this.props.chatId, [this.props.selectedUserId]);

          store.set('chats.users', null);
          store.set('modals.deleteUser.isLoading', false);
          ModalsController.deleteUserToggler(false);
        }
      }
    });
  }

  componentDidUpdate() {
    if (this.props.show && !this.props.users) {
      ChatsController.getUsers(this.props.chatId).then((data) => {
        store.set('chats.users', data);
      });
    }

    this.children.centerElement = this.createList(this.props);
    return true;
  }

  private createList(props: InterfacePropsWithStore) {
    return new ModalsDeleteUserList({
      users: props.users && props.users.map(item => new ModalsDeleteUserListItem({
        text: item.login,
        events: {
          click: () => {
            ModalsController.deleteUserSelect(item.id);
          }
        },
        selected: item.id === this.props.selectedUserId
      }))
    });
  }

  render() {
    return this.compile(template, { ...this.props, title: 'Delete user' });
  }
}

export default withStore(state => ({
  ...state.modals.deleteUser,
  userId: state.user.data?.id,
  chatId: state.chats.selectedId,
  users: state.chats.users
}))(ModalsDeleteUser);
