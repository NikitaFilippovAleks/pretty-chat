import { expect } from 'chai';

import { Indexed } from '../../typings/types/common';

import set from './set';

describe('set helper', () => {
  let obj = {};
  const path = 'a.b';
  const value = 3;

  beforeEach(() => {
    obj = {};
  });

  it('should set value by keypath', () => {
    // act
    const result = set(obj, path, value) as Indexed;

    // assert
    expect(result.a.b).to.eq(value);
  });

  it('should return "object" value, if passed parameter is not an object', () => {
    // arrange
    obj = 4;

    // act
    const result = set(obj, path, value) as Indexed;

    // assert
    expect(result).to.eq(obj);
  });

  it('should throw error if path is not string', () => {
    // arrange
    const numberPath = 5;

    // act
    // @ts-ignore
    const func = () => set(obj, numberPath, value) as Indexed;

    // assert
    expect(func).to.throw(Error);
  });

  it('should mutate passed object, not create new one', () => {
    // act
    const result = set(obj, path, value) as Indexed;

    // assert
    expect(result).to.eq(obj);
  });
});
