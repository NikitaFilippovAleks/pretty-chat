import { expect } from 'chai';

import merge from './merge';

describe('merge', () => {
  it('should merge objects', () => {
    const obj1 = {
      number: 1
    };
    const obj2 = {
      string: 'test'
    };
    const obj3 = {
      number: 1,
      string: 'test'
    };

    const result = merge(obj1, obj2);

    expect(result).to.deep.eq(obj3);
  });
});
