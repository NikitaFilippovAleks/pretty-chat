import template from './index.hbs';

import Block from '../../../utils/Block';

interface InterfaceModalsFileCloseButtonProps {
  events: {
    click: () => void
  }
}

class ModalsFileCloseButton extends Block<InterfaceModalsFileCloseButtonProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ModalsFileCloseButton;
