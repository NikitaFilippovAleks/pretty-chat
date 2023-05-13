import template from './index.hbs';

import IconSend from '../../../../../static/icons/IconSend.svg';

import Block from '../../../../utils/Block';
import ChatsDialogFormInput from './input';

interface InterfaceProps {
  IconSend?: SVGElement;
  events: {
    submit: (event: SubmitEvent) => void;
  }
}

class ChatsDialogForm extends Block<InterfaceProps> {
  init() {
    this.children.ChatsDialogFormInput = new ChatsDialogFormInput();
  }

  render() {
    return this.compile(template, { ...this.props, IconSend });
  }
}

export default ChatsDialogForm;
