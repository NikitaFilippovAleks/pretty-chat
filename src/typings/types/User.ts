export interface InterfaceUser {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: number,
  avatar: string
}

export interface InterfacePasswordsData {
  oldPassword: string;
  newPassword: string;
}
