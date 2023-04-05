import template from './index.hbs';

import Block from '../../../../utils/Block';

class ModalsDeleteUserList extends Block<any> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ModalsDeleteUserList;
