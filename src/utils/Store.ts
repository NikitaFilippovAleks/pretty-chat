import Block from './Block';
import EventBus from './EventBus';

import { InterfaceChat } from '../typings/types/Chat';
import { InterfaceMessage } from '../controllers/MessagesController';
import { InterfaceUser } from '../typings/types/User';

// import isEqual from './helpers/isEqual';
import set from './helpers/set';

type StoreTypes = {
  'updated': [ StateInterface ],
}

export interface StateInterface {
  chats: {
    users?: InterfaceUser[];
    selectedId?: number;
    list: {
      data: InterfaceChat[];
      isLoading: boolean;
    }
  },
  user: {
    data?: InterfaceUser,
    error?: string,
    isLoading: boolean
  },
  messages: Array<InterfaceMessage[]>,
  modals: {
    addUser: {
      show: boolean;
      isLoading: boolean;
      error?: string;
    },
    deleteUser: {
      show: boolean;
      isLoading: boolean;
      selectedUserId?: number;
      error?: string;
    },
    createChat: {
      show: boolean;
      isLoading: boolean;
    },
    editChats: {
      show: boolean;
    },
    file: {
      show: boolean;
      text: string,
      file?: File;
    }
  }
}

class Store extends EventBus<StoreTypes> {
  static EVENTS = {
    UPDATED: 'updated'
  } as const;

  private _state: StateInterface = {
    chats: {
      list: {
        data: [],
        isLoading: false
      }
    },
    user: {
      isLoading: false
    },
    messages: [],
    modals: {
      addUser: {
        show: false,
        isLoading: false
      },
      deleteUser: {
        show: false,
        isLoading: false
      },
      createChat: {
        show: false,
        isLoading: false
      },
      editChats: {
        show: false
      },
      file: {
        show: false,
        text: 'Choose file on your pc'
      }
    }
  } as StateInterface;

  set(path: string, value: unknown) {
    set(this._state, path, value);

    this.emit(Store.EVENTS.UPDATED, this.getState());
  }

  getState(): StateInterface {
    return this._state;
  }
}

const store = new Store();

export const withStore = (
  mapStateToProps: (state: StateInterface) => any
) => (
  Component: typeof Block<any>
) => {
  let propsFromState: any;

  return class WithStore extends Component {
    constructor(props: any) {
      propsFromState = mapStateToProps(store.getState());

      super({ ...props, ...propsFromState });

      store.on(Store.EVENTS.UPDATED, (newState) => {
        const newPropsFromState = mapStateToProps(newState);

        // if (!isEqual(propsFromState, newPropsFromState)) {
        //   return;
        // }

        this.setProps({ ...newPropsFromState });
      });
    }
  };
};

export default store;
