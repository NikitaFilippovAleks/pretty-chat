import template from './index.hbs';

import Block from '../../../../utils/Block';

interface InterfaceProfileInfoShowProps {
  title: string;
  data: string;
}

class ProfileInfoShow extends Block<InterfaceProfileInfoShowProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ProfileInfoShow;
