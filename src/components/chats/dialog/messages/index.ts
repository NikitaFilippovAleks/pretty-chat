import template from './index.hbs';

import ChatsDialogMessagesItem from './item';

import Block from '../../../../utils/Block';
import { withStore } from '../../../../utils/Store';

import { InterfaceMessage } from '../../../../controllers/MessagesController';

type InterfacePropsWithStore = { messages: InterfaceMessage[], userId: number, selectedChatId: number };

class ChatsDialogMessages extends Block<InterfacePropsWithStore> {
  init() {
    this.children.messages = this.createMessages(this.props);
  }

  componentDidUpdate(oldProps: InterfacePropsWithStore, newProps: InterfacePropsWithStore) {
    this.children.messages = this.createMessages(newProps);
    return true;
  }

  private createMessages(props: InterfacePropsWithStore) {
    return props.messages.map(item => new ChatsDialogMessagesItem({
      text: item.content,
      isUserMessage: item.user_id === props.userId
    }));
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore((state) => {
  const selectedChatId = state.chats.selectedId;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChatId: undefined,
      userId: state.user.data?.id
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChatId,
    userId: state.user.data?.id
  };
})(ChatsDialogMessages);
