import Block from '../Block';

import checkInputValue from '../data/checkInputValue';
import { FieldNames } from '../data/checkValue';

const inputBlur = <T extends Block>(item: { name: FieldNames }, index: number, form: T) => {
  const input = form.children.inputs[index];
  const { inputField } = form.children.inputs[index].children;

  checkInputValue(input, inputField, item.name);
};

export default inputBlur;
