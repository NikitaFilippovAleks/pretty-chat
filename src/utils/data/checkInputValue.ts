import Input from '../../components/input';
import InputField from '../../components/input/field';

import isValid, { FieldNames } from './isValid';

const checkInputValue = (input: Input, inputField: InputField, fieldName: FieldNames) => {
  if (inputField.value.length === 0) {
    input.setProps({ error: 'This field can not be empty' });
    inputField.setProps({ error: 'This field can not be empty', value: inputField.value });
    return false;
  }

  if (!isValid(fieldName, inputField.value)) {
    input.setProps({ error: 'Value is not valid' });
    inputField.setProps({ error: 'Value is not valid', value: inputField.value });
    return false;
  }

  input.setProps({ error: '' });
  inputField.setProps({ error: '', value: inputField.value });
  return true;
};

export default checkInputValue;
