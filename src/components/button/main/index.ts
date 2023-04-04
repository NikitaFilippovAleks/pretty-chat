import template from './index.hbs';

import Block from '../../../utils/Block';

interface InterfaceButtonMainProps {
  class: string;
  type: string;
  text: string;
  events: {
    click: () => void;
  },
  mb?: string;
}

export default class ButtonMain extends Block<InterfaceButtonMainProps, HTMLButtonElement> {
  render() {
    return this.compile(template, this.props);
  }
}
