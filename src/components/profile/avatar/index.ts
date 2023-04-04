import template from './index.hbs';

import IconAvatar from '../../../../static/icons/IconAvatar.svg';

import Block from '../../../utils/Block';

import { withStore } from '../../../utils/Store';

interface InterfaceProfileAvatarProps {
  text?: string;
  IconAvatar?: SVGElement;
  avatar?: string;
  events?: {
    click: () => void;
  }
}

class ProfileAvatar extends Block<InterfaceProfileAvatarProps> {
  render() {
    return this.compile(template, { ...this.props, IconAvatar });
  }
}

export default withStore(state => state.user.data)(ProfileAvatar);
