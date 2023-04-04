import Input from '../../components/input/text';
import { InputField } from '../../components/input/text/field';

import checkValue, { FieldNames } from './checkValue';

const checkInputValue = (input: Input, inputField: InputField, fieldName: FieldNames) => {
  if (inputField.value.length === 0) {
    input.setProps({ error: 'This field can not be empty' });
    inputField.setProps({ error: 'This field can not be empty', value: inputField.value });
    return false;
  }

  const { isValid, error } = checkValue(fieldName, inputField.value);

  if (!isValid) {
    input.setProps({ error });
    inputField.setProps({ error, value: inputField.value });
    return false;
  }

  input.setProps({ error: '' });
  inputField.setProps({ error: '', value: inputField.value });
  return true;
};

export default checkInputValue;
