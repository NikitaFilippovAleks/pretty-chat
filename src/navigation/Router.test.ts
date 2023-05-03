import { expect } from 'chai';
import sinon from 'sinon';

import Router, { BlockConstructable } from './Router';

const backMock = sinon.stub();
const forwardMock = sinon.stub();
const pushState = sinon.stub();
const replaceState = sinon.stub();

describe('Router', () => {
  global.window.history.back = backMock;
  global.window.history.forward = forwardMock;
  global.window.history.pushState = pushState;
  global.window.history.replaceState = replaceState;

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
    dispatchComponentDidMount = sinon.stub();
  } as unknown as BlockConstructable;

  beforeEach(() => {
    getContentFake.resetHistory();
    backMock.reset();
    forwardMock.reset();
    pushState.reset();
  });

  it('use() should return Router instance', () => {
    const result = Router.use('/', BlockMock);

    expect(result).to.eq(Router);
  });

  it('should call render() on start()', () => {
    Router.use('/', BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('should call history.back on back()', () => {
    Router.use('/', BlockMock).start();
    Router.back();

    expect(backMock.called).to.eq(true);
  });

  it('should call history.back on back()', () => {
    Router.use('/', BlockMock).start();
    Router.forward();

    expect(forwardMock.called).to.eq(true);
  });

  it('should call history.pushState on go()', () => {
    Router.use('/', BlockMock).start();
    Router.go('testPath');

    expect(pushState.calledWith({}, '', 'testPath')).to.eq(true);
  });

  it('should call history.pushState on replace()', () => {
    Router.use('/', BlockMock).start();
    Router.replace('testPath');

    expect(replaceState.calledWith({}, '', 'testPath')).to.eq(true);
  });
});
