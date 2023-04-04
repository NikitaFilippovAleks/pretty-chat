import Block from '../../../../utils/Block';
import template from './index.hbs';

interface InterfaceProps {
  title: string;
  icon: SVGElement;
  events: {
    click: () => void;
  }
}

class ModalsEditChatsButton extends Block<InterfaceProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ModalsEditChatsButton;
