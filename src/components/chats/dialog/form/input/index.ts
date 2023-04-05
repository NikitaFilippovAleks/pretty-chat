import Block from '../../../../../utils/Block';
import template from './index.hbs';

class ChatsDialogFormInput extends Block<any> {
  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatsDialogFormInput;
