import { VanillaSantry } from '../../src/VanillaSantry';
import { Event } from '../../src/type';
test('Error Context parse', () => {
  const mockSantry = new VanillaSantry('token');
  const event = {
    timeStamp: undefined,
    type: undefined,
    value: undefined,
    stacktrace: undefined,
    context: undefined,
  };
  mockSantry.createEventFromError(event, new Error('test'));
});
