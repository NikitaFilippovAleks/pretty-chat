export enum FieldNames {
  'first_name',
  'second_name',
  'display_name',
  'login',
  'email',
  'password',
  'confirm_password',
  'old_password',
  'new_password',
  'repeated_new_password',
  'phone',
  'message'
}

const checkValue = (fieldName: FieldNames, value: string) => {
  switch (fieldName) {
    case FieldNames.first_name:
    case FieldNames.second_name:
    case FieldNames.display_name:
      return {
        isValid: /^[А-ЯA-ZЁ][а-яa-zё-]*$/.test(value),
        error: 'Does not fit name format.'
      };

    case FieldNames.login:
      return {
        isValid: /^(?=.{3,20}$)[a-zA-Z0-9]+(?:[_-][a-zA-Z0-9]+)*$/.test(value),
        error: 'Does not fit login format.'
      };

    case FieldNames.email:
      return {
        isValid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        error: 'Does not fit email format.'
      };

    case FieldNames.password:
    case FieldNames.confirm_password:
    case FieldNames.old_password:
    case FieldNames.new_password:
    case FieldNames.repeated_new_password:
      return {
        isValid: /^(?=.*\d)(?=.*[A-Z])[a-zA-Z\d]{8,40}$/.test(value),
        error: 'Does not fit password format.'
      };

    case FieldNames.phone:
      return {
        isValid: /^\+?\d{10,15}$/.test(value),
        error: 'Does not fit phone number format.'
      };

    default:
      throw new Error('No such field name check');
  }
};

export default checkValue;
