import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';

import userController from './UserController';

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
    const data = {
      first_name: 'test',
      second_name: 'test',
      display_name: 'test',
      login: 'test',
      email: 'test',
      phone: 1
    };

    userController.updateProfile(data);
    const [request] = requests;

    expect(request.method).to.eq('PUT');
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it('should call put with correct props on updateAvatar()', () => {
    const file = 'file' as unknown as File;
    const formData = new FormData();
    formData.append('avatar', file);

    userController.updateAvatar(file);
    const [request] = requests;

    expect(request.method).to.eq('PUT');
    expect(request.requestBody).to.deep.eq(formData);
  });

  it('should call put with correct props on updatePassword()', () => {
    const data = {
      old_password: 'test',
      new_password: 'test'
    };
    const expectedOutput = {
      oldPassword: 'test',
      newPassword: 'test'
    };

    userController.updatePassword(data);
    const [request] = requests;

    expect(request.method).to.eq('PUT');
    expect(request.requestBody).to.eq(JSON.stringify(expectedOutput));
  });

  it('should call put with correct props on searchUser()', () => {
    const expectedOutput = {
      login: 'login'
    };

    userController.searchUser('login');
    const [request] = requests;

    expect(request.method).to.eq('POST');
    expect(request.requestBody).to.eq(JSON.stringify(expectedOutput));
  });
});
