import template from './index.hbs';

import IconArrowForward from '../../../../static/icons/IconArrowForward.svg';

import Block from '../../../utils/Block';

interface InterfaceButtonProfileProps {
  IconArrowForward?: SVGElement;
  events: {
    click: () => void;
  }
}

class ButtonProfile extends Block<InterfaceButtonProfileProps, HTMLButtonElement> {
  render() {
    return this.compile(template, { ...this.props, IconArrowForward });
  }
}

export default ButtonProfile;
