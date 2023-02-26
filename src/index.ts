import Handlebars from 'handlebars/dist/handlebars.runtime';
import { TemplateDelegate } from 'handlebars';

import buttonBack from './components/button/back/index';
import buttonMain from './components/button/main/index.hbs';
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

import authorization from './pages/authorization/index.hbs';
import chats from './pages/chats/index.hbs';
import error404 from './pages/errors/404/index.hbs';
import error500 from './pages/errors/500/index.hbs';
import modals from './pages/modals/index.hbs';
import profileEditData from './pages/profile/edit/data/index.hbs';
import profileEditPassword from './pages/profile/edit/password/index.hbs';
import profileMain from './pages/profile/main/index.hbs';
import registration from './pages/registration/index.hbs';

Handlebars.registerPartial({
  buttonBack,
  buttonMain,
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

function render(html: string) {
  const root = document.querySelector('#root') as HTMLElement;

  root.innerHTML = html;
}

const routes: { [key: string] : TemplateDelegate} = {
  authorization,
  error404,
  error500,
  profileEditData,
  profileEditPassword,
  profileMain,
  registration,
  modals,
  chats
};

window.goToPage = (name: string) => {
  const page = routes[name];

  render(page({}));
};

window.addEventListener('DOMContentLoaded', () => {
  render(authorization({}));
});
