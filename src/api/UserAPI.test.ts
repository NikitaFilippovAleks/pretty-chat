import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';

import UserAPI from './UserAPI';

describe('UsersAPI', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('should call put with correct props on updateProfile()', () => {
    const api = new UserAPI();
    const data = {
      first_name: 'test',
      second_name: 'test',
      display_name: 'test',
      login: 'test',
      email: 'test',
      phone: 1
    };

    api.updateProfile(data);
    const [request] = requests;

    expect(request.method).to.eq('PUT');
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it('should call put with correct props on updateAvatar()', () => {
    const api = new UserAPI();
    const data = new FormData();
    data.append('key1', 'value1');

    api.updateAvatar(data);
    const [request] = requests;

    expect(request.method).to.eq('PUT');
    expect(request.requestBody).to.eq(data);
  });

  it('should call put with correct props on updatePassword()', () => {
    const api = new UserAPI();
    const data = {
      oldPassword: 'test',
      newPassword: 'test'
    };

    api.updatePassword(data);
    const [request] = requests;

    expect(request.method).to.eq('PUT');
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it('should call put with correct props on searchUser()', () => {
    const api = new UserAPI();
    const data = {
      login: 'login'
    };

    api.searchUser('login');
    const [request] = requests;

    expect(request.method).to.eq('POST');
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });
});
