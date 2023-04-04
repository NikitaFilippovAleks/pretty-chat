import { InterfaceUser } from './User';

export interface InterfaceChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: InterfaceUser,
    time: string;
    content: string;
  }
}
