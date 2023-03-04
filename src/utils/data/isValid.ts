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

const isValid = (fieldName: FieldNames, value: string) => {
  switch (fieldName) {
    case FieldNames.first_name:
    case FieldNames.second_name:
    case FieldNames.display_name:
      return /^[А-ЯA-ZЁ][а-яa-zё-]*$/.test(value);

    case FieldNames.login:
      return /^(?=.{3,20}$)[a-zA-Z0-9]+(?:[_-][a-zA-Z0-9]+)*$/.test(value);

    case FieldNames.email:
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

    case FieldNames.password:
    case FieldNames.confirm_password:
    case FieldNames.old_password:
    case FieldNames.new_password:
    case FieldNames.repeated_new_password:
      return /^(?=.*\d)(?=.*[A-Z])[a-zA-Z\d]{8,40}$/.test(value);

    case FieldNames.phone:
      return /^\+?\d{10,15}$/.test(value);

    default:
      throw new Error('No such field name check');
  }
};

export default isValid;
