import template from './index.hbs';

import ButtonBack from '../../../../components/button/back';
import FormProfileEditData from '../../../../components/form/profileEditData';
import ModalsFile from '../../../../components/modals/file';
import ProfileAvatar from '../../../../components/profile/avatar';

import ModalsController from '../../../../controllers/ModalsController';

import { StateInterface, withStore } from '../../../../utils/Store';
import Block from '../../../../utils/Block';

import Router from '../../../../navigation/Router';

class ProfileEditDataPage extends Block<StateInterface, HTMLElement> {
  init() {
    this.children.form = new FormProfileEditData({});
    this.children.buttonBack = new ButtonBack({
      text: '',
      modifier: 'light',
      light: true,
      events: {
        click: () => {
          Router.back();
        }
      }
    });
    this.children.avatar = new ProfileAvatar({
      events: {
        click: () => {
          ModalsController.modalsFileToggle(true);
        }
      }
    });

    this.children.modalsFile = new ModalsFile({});
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(state => state.modals.file)(ProfileEditDataPage);
