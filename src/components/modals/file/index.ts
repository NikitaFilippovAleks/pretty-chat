import template from '../index.hbs';

import ButtonMain from '../../button/main';
import InputFile from '../../input/file';
import ModalsCloseButton from '../closeButton';

import ModalsController from '../../../controllers/ModalsController';
import UserController from '../../../controllers/UserController';

import { StateInterface, withStore } from '../../../utils/Store';
import Block from '../../../utils/Block';

interface InterfaceModalsFileProps {
  title?: string;
  show?: boolean;
}

class ModalsFile extends Block<InterfaceModalsFileProps & StateInterface['modals']['file']> {
  init() {
    this.children.closeButton = new ModalsCloseButton({
      events: {
        click: () => {
          ModalsController.modalsFileToggle(false);
        }
      }
    });
    this.children.centerElement = new InputFile({});

    this.children.mainButton = new ButtonMain({
      class: 'primary',
      text: 'Change',
      type: 'button',
      mb: '53px',
      events: {
        click: async () => {
          if (this.props.file) {
            await UserController.updateAvatar(this.props.file);

            ModalsController.modalsFileToggle(false);
          }
        }
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props, title: 'Download file' });
  }
}

export default withStore(state => ({ ...state.modals.file, ...state.user }))(ModalsFile);
