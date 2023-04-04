import template from './index.hbs';

import ButtonProfile from '../../button/profile';
import ChatsListItem from './item';

import IconAvatar from '../../../../static/icons/IconAvatar.svg';

import { InterfaceChat } from '../../../typings/types/Chat';
import { InterfaceUser } from '../../../typings/types/User';

import ChatsController from '../../../controllers/ChatsController';

import store, { withStore } from '../../../utils/Store';
import Block from '../../../utils/Block';
import getTime from '../../../utils/data/getTime';

import Router from '../../../navigation/Router';
import Routes from '../../../navigation/Routes';

interface InterfaceChatsListProps {
  IconAvatar?: SVGElement;
}

type InterfacePropsWithStore = InterfaceChatsListProps & InterfaceUser & { chats: InterfaceChat[] };

class ChatsList extends Block<InterfacePropsWithStore> {
  init() {
    this.children.buttonProfile = new ButtonProfile({
      events: {
        click: () => {
          Router.go(Routes.Profile);
        }
      }
    });

    this.children.chats = this.createChats(this.props);
  }

  protected componentDidUpdate(_: InterfacePropsWithStore, newProps: InterfacePropsWithStore): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: { chats: InterfaceChat[] }) {
    return props.chats.map(item => new ChatsListItem({
      title: item.title,
      avatar: item.avatar,
      message: item.last_message ? item.last_message.content : null,
      time: item.last_message ? getTime(item.last_message.time) : null,
      events: {
        click: () => {
          ChatsController.selectChat(item.id);
        }
      },
      selected: item.id === store.getState().chats.selectedId
    }));
  }

  render() {
    return this.compile(template, { ...this.props, IconAvatar });
  }
}

export default withStore(state => ({ ...state.user.data, chats: [...(state.chats.list.data || [])] }))(ChatsList);
