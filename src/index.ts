import Handlebars from 'handlebars/dist/handlebars.runtime';

import AuthorizationPage from './pages/authorization';
import ChatsPage from './pages/chats';
import ProfileEditDataPage from './pages/profile/edit/data';
import ProfileEditPasswordPage from './pages/profile/edit/password';
import ProfileMainPage from './pages/profile/main';
import RegistrationPage from './pages/registration';

import buttonBack from './components/button/back/index';
import buttonMain from './components/button/main/buttonMain.hbs';
import chatsDialog from './components/chats/dialog/index.hbs';
import chatsDialogForm from './components/chats/dialog/form/index';
import chatsDialogHeader from './components/chats/dialog/header/index';
import chatsList from './components/chats/list/index.hbs';
import chatsListItem from './components/chats/list/item/index.hbs';
import form from './components/form/form.hbs';
import input from './components/input/text/index.hbs';
import profileAvatar from './components/profile/avatar/index';
import profileInfoEdit from './components/profile/info/edit/profileInfoEdit.hbs';
import profileInfoShow from './components/profile/info/show/index.hbs';
import throbber from './components/throbber/throbber.hbs';
import title from './components/title/title.hbs';

import layoutCard from './layout/card/layoutCard.hbs';
import layoutMain from './layout/main/layoutMain.hbs';
import layoutProfile from './layout/profile/layoutProfile.hbs';
import layoutWindow from './layout/window/layoutWindow.hbs';

import Router from './navigation/Router';
import Routes from './navigation/Routes';

import AuthController from './controllers/AuthController';

import '../static/index.pcss';

Handlebars.registerPartial({
  buttonBack,
  buttonMain,
  chatsDialog,
  chatsDialogForm,
  chatsDialogHeader,
  chatsList,
  chatsListItem,
  form,
  input,
  layoutCard,
  layoutMain,
  layoutProfile,
  layoutWindow,
  profileAvatar,
  profileInfoEdit,
  profileInfoShow,
  throbber,
  title
});

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, AuthorizationPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Profile, ProfileMainPage)
    .use(Routes.ProfileEdit, ProfileEditDataPage)
    .use(Routes.PasswordEdit, ProfileEditPasswordPage)
    .use(Routes.Messenger, ChatsPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
    default:
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger);
    }
  } catch (error) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});

// some comment
