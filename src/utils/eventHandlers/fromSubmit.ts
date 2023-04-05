import Block from '../Block';

import checkInputValue from '../data/checkInputValue';
import { FieldNames } from '../data/checkValue';

const formSubmit = <T extends Block<any>>(
  event: SubmitEvent,
  inputs: { name: FieldNames }[],
  form: T,
  callback: (data: any) => void
) => {
  event.preventDefault();

  const data: Record<string, unknown> = {};
  let correct = true;

  inputs.forEach((item, index) => {
    const input = form.children.inputs[index];
    const { inputField } = form.children.inputs[index].children;

    data[item.name] = inputField.value;

    if (item.name === FieldNames.repeated_new_password) {
      if (data[FieldNames.repeated_new_password] !== data[FieldNames.new_password]) {
        input.setProps({ error: 'Passwords are not equal' });
        inputField.setProps({ error: 'Passwords are not equal', value: inputField.value });
        correct = false;
        return;
      }
    }
    correct = checkInputValue(input, inputField, item.name);
  });

  /* eslint-disable no-console */
  if (!correct) console.log('Invalid fields');
  else callback(data);
  /* eslint-enable no-console */
};

export default formSubmit;
