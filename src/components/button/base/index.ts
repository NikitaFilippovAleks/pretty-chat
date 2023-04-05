import template from './index.hbs';

import Block from '../../../utils/Block';

interface InterfaceButtonBaseProps {
  text: string;
  events: {
    click: () => void
  }
}

class ButtonBase extends Block<InterfaceButtonBaseProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ButtonBase;
