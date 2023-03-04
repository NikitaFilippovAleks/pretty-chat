import Handlebars from 'handlebars/dist/handlebars.runtime';

import buttonBack from './components/button/back/index';
import buttonMain from './components/button/main/index.hbs';
import chatsDialog from './components/chats/dialog/index.hbs';
import chatsDialogForm from './components/chats/dialog/form/index';
import chatsDialogHeader from './components/chats/dialog/header/index';
import chatsDialogMessage from './components/chats/dialog/message/index.hbs';
import chatsList from './components/chats/list/index.hbs';
import chatsListItem from './components/chats/list/item/index.hbs';
import form from './components/form/index.hbs';
import input from './components/input/index.hbs';
import navigation from './components/navigation/index.hbs';
import profileAvatar from './components/profile/avatar/index';
import profileInfoEdit from './components/profile/info/edit/index.hbs';
import profileInfoShow from './components/profile/info/show/index.hbs';
import title from './components/title/index.hbs';

import layoutCard from './layout/card/index.hbs';
import layoutMain from './layout/main/index.hbs';
import layoutProfile from './layout/profile/index.hbs';
import layoutWindow from './layout/window/index.hbs';

import renderDom from './utils/renderDom';

Handlebars.registerPartial({
  buttonBack,
  buttonMain,
  chatsDialog,
  chatsDialogForm,
  chatsDialogHeader,
  chatsDialogMessage,
  chatsList,
  chatsListItem,
  form,
  input,
  layoutCard,
  layoutMain,
  layoutProfile,
  layoutWindow,
  navigation,
  profileAvatar,
  profileInfoEdit,
  profileInfoShow,
  title
});

window.addEventListener('DOMContentLoaded', () => {
  renderDom('authorization');
});
