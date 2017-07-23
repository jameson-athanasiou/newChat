const user = require('./../../../src/service/user');
const chai = require('chai');
const sinon = require('sinon');

describe('User tests', function () {

    const assert = chai.assert;
    const sandbox = sinon.sandbox.create();
    const stubs = {};

    beforeEach(function () {
        stubs.fetch = sandbox.stub(window, 'fetch');
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('When updating the user name Then fetch is called with the correct endpoint', function () {
        stubs.fetch.resolves();
        user.updateUsername();
        assert.isTrue(stubs.fetch.calledWith('/user'), 'fetch not called with the correct endpoint');
    });
});