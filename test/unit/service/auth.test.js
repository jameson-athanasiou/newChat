const auth = require('./../../../src/service/auth');
const chai = require('chai');
const sinon = require('sinon');


describe('auth tests', function () {

    const assert = chai.assert;
    const sandbox = sinon.sandbox.create();
    const stubs = {};

    beforeEach(function () {
        stubs.fetch = sandbox.stub(window, 'fetch');
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('When authenticating the user Then fetch should be called with the correct endpoint', function () {
        stubs.fetch.resolves();
        auth.authenticateUser();
        assert.isTrue(stubs.fetch.calledWith('/authenticate'), 'fetch not called with the correct endpoint');
    });

    it('should be true', function() {
        assert.equal(1,1, 'one is not one for some reason');
    });
});