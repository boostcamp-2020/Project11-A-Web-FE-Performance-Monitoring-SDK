import Axios from 'axios';

const url = 'http://weareserver/sdk/';

let defaultSetting = {};

const init = (obj) => {
  defaultSetting = { ...defaultSetting, ...obj };
  return true;
};

const captureException = (error: Error) => {
  const result = Axios.post(
    `${url}/captureException`,
    { header: defaultSetting },
    {
      data: error,
    }
  );
  throw error;
};

const captureMessage = () => {};

const addMessageType = () => {};

export default { captureException, captureMessage, addMessageType, init };
