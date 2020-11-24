import { SantryInit, Santry } from '../src/express';
describe('init', () => {
  test('Success init', () => {
    const option = {
      projectId: 1,
      token: 'asdf',
    };
    SantryInit(option);
    expect(Santry.option).toBe(option);
  });
});
