import { expect } from 'chai';
import sinon from 'sinon';

import ButtonBack from '.';

const callback = sinon.stub();
const renderComponent = () => new ButtonBack({
  text: 'Test text',
  light: true,
  modifier: 'light',
  events: {
    click: callback
  }
});

describe('ButtonBack component', () => {
  beforeEach(() => {
    callback.reset();
  });

  it('should render passed text', () => {
    // act
    const component = renderComponent();

    // assert
    expect(component.element.textContent).to.match(/Test text/);
  });

  it('should render element with passed modifier class', () => {
    // act
    const component = renderComponent();

    // assert
    expect(component.element.getAttribute('class')).to.match(/light/);
  });

  it('should call callback with click on element', () => {
    // act
    const component = renderComponent();
    component.element.click();

    // assert
    expect(callback.calledOnce).to.eq(true);
  });
});
