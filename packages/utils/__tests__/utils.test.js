'use strict';

const utils = require('..');

describe('utils', () => {
    try{
        throw new Error("hi")
    } catch(error) {
        utils.parseErrorStack(error);
    }
    it('needs tests');
});
