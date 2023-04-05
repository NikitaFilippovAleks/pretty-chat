import template from './index.hbs';

import Block from '../../../../utils/Block';

import IconAvatar from '../../../../../static/icons/IconAvatar.svg';

interface InterfaceProps {
  title: string;
  avatar: string;
  message: string | null;
  time: string | null;
  events: {
    click: () => void;
  };
  IconAvatar?: SVGElement;
  selected: boolean;
}

class ChatsListItem extends Block<InterfaceProps> {
  render() {
    return this.compile(template, { ...this.props, IconAvatar });
  }
}

export default ChatsListItem;
