import Block from '../Block';

import checkInputValue from '../data/checkInputValue';
import { FieldNames } from '../data/checkValue';

const formSubmit = <T extends Block>(event: SubmitEvent, inputs: { name: FieldNames }[], form: T) => {
  event.preventDefault();

  const data: Record<string, unknown> = {};
  let correct = true;

  inputs.forEach((item, index) => {
    const input = form.children.inputs[index];
    const { inputField } = form.children.inputs[index].children;

    data[item.name] = inputField.value;

    correct = checkInputValue(input, inputField, item.name);
  });

  /* eslint-disable no-console */
  if (!correct) console.log('Invalid fields');
  else console.log('data:', data);
  /* eslint-enable no-console */
};

export default formSubmit;
