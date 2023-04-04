import template from './index.hbs';

import Block from '../../../../../utils/Block';

interface InterfaceProps {
  text: string;
  isUserMessage: boolean;
}

class ChatsDialogMessagesItem extends Block<InterfaceProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ChatsDialogMessagesItem;
