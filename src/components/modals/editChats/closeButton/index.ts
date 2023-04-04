import template from './index.hbs';

import Block from '../../../../utils/Block';

interface InterfaceProps {
  events: {
    click: () => void;
  }
}

class ModalsEditChatsCloseButton extends Block<InterfaceProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ModalsEditChatsCloseButton;
