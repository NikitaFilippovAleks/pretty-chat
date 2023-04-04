import template from './index.hbs';

import IconDots from '../../../../../../static/icons/IconDots.svg';

import Block from '../../../../../utils/Block';

interface InterfaceProps {
  events: {
    click: () => void;
  },
  IconDots?: SVGElement;
}

class ChatsDialogHeaderButton extends Block<InterfaceProps> {
  render() {
    return this.compile(template, { ...this.props, IconDots });
  }
}

export default ChatsDialogHeaderButton;
