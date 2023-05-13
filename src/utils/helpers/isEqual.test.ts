import { expect } from 'chai';

import isEqual from './isEqual';

describe('isEqual', () => {
  it('should return true with same objects', () => {
    const lhs = {
      number: 1
    };
    const rhs = {
      number: 1
    };

    const result = isEqual(lhs, rhs);

    expect(result).to.eq(true);
  });

  it('should return false with different objects', () => {
    const lhs = {
      number: 1
    };
    const rhs = {
      number: 2
    };

    const result = isEqual(lhs, rhs);

    expect(result).to.eq(false);
  });

  it('should return true with same deep objects', () => {
    const lhs = {
      number: 1,
      nestedObject: {
        string: 'test'
      }
    };
    const rhs = {
      number: 1,
      nestedObject: {
        string: 'test'
      }
    };

    const result = isEqual(lhs, rhs);

    expect(result).to.eq(true);
  });

  it('should return false with different deep objects', () => {
    const lhs = {
      number: 1,
      nestedObject: {
        string: 'test'
      }
    };
    const rhs = {
      number: 1,
      nestedObject: {
        string: 'test1'
      }
    };

    const result = isEqual(lhs, rhs);

    expect(result).to.eq(false);
  });
});
