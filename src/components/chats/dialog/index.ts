import template from './index.hbs';

import ChatsDialogForm from './form';
import ChatsDialogHeader from './header';
import ChatsDialogMessages from './messages';

import { StateInterface, withStore } from '../../../utils/Store';
import Block from '../../../utils/Block';

import MessagesController from '../../../controllers/MessagesController';

class ChatsDialog extends Block<StateInterface['chats']> {
  init() {
    this.children.chatsDialogHeader = this.createChatsDialogHeader(this.props);
    this.children.chatsDialogMessages = new ChatsDialogMessages({});
    this.children.ChatsDialogForm = new ChatsDialogForm({
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();

          const message = this.children.ChatsDialogForm.children.ChatsDialogFormInput.value;

          if (message.length === 0) return;

          MessagesController.sendMessage(this.props.selectedId!, message);

          this.children.ChatsDialogForm.children.ChatsDialogFormInput.element.value = '';
        }
      }
    });
  }

  componentDidUpdate(_: StateInterface['chats'], newProps: StateInterface['chats']) {
    this.children.chatsDialogHeader = this.createChatsDialogHeader(newProps);
    return true;
  }

  private createChatsDialogHeader(props: StateInterface['chats']) {
    return new ChatsDialogHeader({
      imageSrc: props.selectedId
        ? props.list.data.find(item => item.id === props.selectedId)?.avatar
        : null,
      title: props.selectedId
        ? props.list.data.find(item => item.id === props.selectedId)?.title
        : null
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(state => ({ ...state.chats }))(ChatsDialog);
