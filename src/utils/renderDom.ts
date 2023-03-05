import AuthorizationPage from '../pages/authorization';
import ChatsPage from '../pages/chats';
import Error404Page from '../pages/errors/404';
import Error500Page from '../pages/errors/500';
import ModalsPage from '../pages/modals';
import ProfileEditDataPage from '../pages/profile/edit/data';
import ProfileEditPasswordPage from '../pages/profile/edit/password';
import ProfileMainPage from '../pages/profile/main';
import RegistrationPage from '../pages/registration';

const ROUTES = {
  authorization: AuthorizationPage,
  registration: RegistrationPage,
  profileMain: ProfileMainPage,
  profileEditData: ProfileEditDataPage,
  profileEditPassword: ProfileEditPasswordPage,
  chats: ChatsPage,
  error404: Error404Page,
  error500: Error500Page,
  modals: ModalsPage
};

function renderDom(route: keyof typeof ROUTES) {
  const root = document.querySelector('#root') as HTMLElement;

  root.innerHTML = ''; // ????

  const PageComponent = ROUTES[route];
  const page = new PageComponent();

  root.appendChild(page.element);

  page.dispatchComponentDidMount();
}

export default renderDom;
