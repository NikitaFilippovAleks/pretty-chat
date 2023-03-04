import template from './index.hbs';

import Navigation from '../../components/navigation';

import IconArrowForward from '../../../static/icons/IconArrowForward.svg';

import Block from '../../utils/Block';

interface InterfaceChatsPageProps {
  IconArrowForward: SVGElement
}

class ChatsPage extends Block<InterfaceChatsPageProps> {
  init() {
    this.children.navigation = new Navigation();
  }

  render() {
    return this.compile(template, { ...this.props, IconArrowForward });
  }
}

export default ChatsPage;
