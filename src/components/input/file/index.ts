import template from './index.hbs';

import InputFileField from './field';

import ModalsController from '../../../controllers/ModalsController';

import { StateInterface, withStore } from '../../../utils/Store';
import Block from '../../../utils/Block';

interface InterfaceInputFileProps {
  inputField: InputFileField;
  text: string;
}

class InputFile extends Block<InterfaceInputFileProps & StateInterface['modals']['file']> {
  init() {
    this.children.inputField = new InputFileField({
      events: {
        change: (e) => {
          ModalsController.modalsFileSetFile((e.target as HTMLInputElement).files![0]);
          ModalsController.modalsFileSetText((e.target as HTMLInputElement).files![0].name);
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(state => state.modals.file)(InputFile);
