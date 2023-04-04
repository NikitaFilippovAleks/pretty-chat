import template from './index.hbs';

import Block from '../../../../utils/Block';

import ModalsController from '../../../../controllers/ModalsController';

interface InterfaceInputFileFieldProps {
  // fileChangeHandler: (e: Event) => void;
  events: {
    change: () => void;
  }
}

class InputFileField extends Block<InterfaceInputFileFieldProps> {
  get value() {
    return (this.element as HTMLInputElement).value;
  }

  // componentDidMount() {
  //   console.log('element:', this.element);
  //   (this.element as HTMLInputElement).addEventListener('change', this.props.fileChangeHandler);

  //   return true;
  // }

  render() {
    // console.log('ere');
    return this.compile(template, this.props);
  }
}

export default InputFileField;
