import template from './index.hbs';

import Block from '../../utils/Block';
import ButtonBase from '../button/base';
import renderDom from '../../utils/renderDom';

class Navigation extends Block {
  init() {
    this.children.buttons = [
      new ButtonBase({
        text: 'Authorization',
        events: {
          click: () => renderDom('authorization')
        }
      }),
      new ButtonBase({
        text: 'Registration',
        events: {
          click: () => renderDom('registration')
        }
      }),
      new ButtonBase({
        text: 'ProfileMain',
        events: {
          click: () => renderDom('profileMain')
        }
      }),
      new ButtonBase({
        text: 'ProfileEditData',
        events: {
          click: () => renderDom('profileEditData')
        }
      }),
      new ButtonBase({
        text: 'ProfileEditPassword',
        events: {
          click: () => renderDom('profileEditPassword')
        }
      }),
      new ButtonBase({
        text: 'Chats',
        events: {
          click: () => renderDom('chats')
        }
      }),
      new ButtonBase({
        text: 'Error404',
        events: {
          click: () => renderDom('error404')
        }
      }),
      new ButtonBase({
        text: 'Error500',
        events: {
          click: () => renderDom('error500')
        }
      }),
      new ButtonBase({
        text: 'Modals',
        events: {
          click: () => renderDom('modals')
        }
      })
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Navigation;
