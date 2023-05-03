import { expect } from 'chai';
import sinon from 'sinon';

import EventBus from './EventBus';

const callback = sinon.stub();

describe('EventBus', () => {
  beforeEach(() => {
    callback.reset();
  });

  it('should record event and emit it', () => {
    // arrange
    const eventBus = new EventBus();

    // act
    eventBus.on('test event', callback);
    eventBus.emit('test event');

    // assert
    expect(callback.calledOnce).to.eq(true);
  });

  it('should erase event with off method', () => {
    // arrange
    const eventBus = new EventBus();

    // act
    eventBus.on('test event', callback);
    eventBus.off('test event', callback);
    eventBus.emit('test event');

    // assert
    expect(callback.called).to.eq(false);
  });
});
