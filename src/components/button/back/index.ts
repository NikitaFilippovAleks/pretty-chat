import template from './buttonBack.hbs';

import IconArrowBackBlue from '../../../../static/icons/IconArrowBackBlue.svg';
import IconArrowBackLight from '../../../../static/icons/IconArrowBackLight.svg';

import Block from '../../../utils/Block';

interface InterfaceButtonBackProps {
  text: string;
  light: boolean;
  modifier: 'light' | 'blue';
  events: {
    click: () => void;
  };
  IconArrowBackBlue?: SVGElement;
  IconArrowBackLight?: SVGElement;
}

class ButtonBack extends Block<InterfaceButtonBackProps, HTMLButtonElement> {
  render() {
    return this.compile(template, { ...this.props, IconArrowBackBlue, IconArrowBackLight });
  }
}

export default ButtonBack;
