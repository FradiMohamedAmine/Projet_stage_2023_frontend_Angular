import { Customer } from './customer.model';

describe('Customer', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Customer()).toBeTruthy();
  });
});
