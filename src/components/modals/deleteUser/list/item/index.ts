import Block from '../../../../../utils/Block';
import template from './index.hbs';

interface InterfaceProps {
  text: string;
  events: {
    click: () => void;
  };
  selected?: boolean;
}

class ModalsDeleteUserListItem extends Block<InterfaceProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ModalsDeleteUserListItem;
