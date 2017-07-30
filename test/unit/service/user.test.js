import user from './../../../src/service/user';
import * as modelAccessor from './../../../src/model/modelAccessor';
import errorHandler from './../../../src/model/errorHandler';
import chai from 'chai';
import sinon from 'sinon';

/*
const user = require('./../../../src/service/user');
const modelAccessor = require('./../../../src/model/modelAccessor');
const chai = require('chai');
const sinon = require('sinon');
*/

describe('User tests', function () {

    const assert = chai.assert;
    const sandbox = sinon.sandbox.create();
    let spies = {};
    let stubs = {};

    beforeEach(function () {
        spies = {};
        stubs = {};

        stubs.fetch = sandbox.stub(window, 'fetch');
        stubs.handleServiceError = sandbox.stub(errorHandler, 'handleServiceError');
    });

    afterEach(function () {
        spies = {};
        stubs = {};
        sandbox.restore();
    }); 

    it('When updating the user name Then fetch is called with the correct endpoint', function () {
        stubs.fetch.resolves();
        user.updateUsername();
        assert.isTrue(stubs.fetch.calledWith('/user'), 'fetch not called with the correct endpoint');
    });

    it('When updating the user name Then the headers are set correctly', function () {
        stubs.getId = sandbox.stub(modelAccessor, 'getId').returns('1234');

        const username = 'xXitsMe_1995Xx';
        const postData = {
            username,
            id: '1234' 
        };
        const expectedHeaders = {
            method: 'post',
            "Content-type": "application/json",
            body: JSON.stringify(postData)
        }; 

        stubs.fetch.resolves();
        user.updateUsername(username);

        const passedHeaders = stubs.fetch.args[0][1];

        assert.deepEqual(passedHeaders, expectedHeaders, 'headers were not correct');
    });

    it.only('Given a fetch error When updating the user name Then the error is logged', function () {
        stubs.getId = sandbox.stub(modelAccessor, 'getId').returns('1234');

        stubs.fetch.returns(Promise.resolve({
            ok: false,
            status: 500,
            statusText: 'There was an error'
        }));
         
        user.updateUsername();
        
        assert.isTrue(stubs.handleServiceError.called, 'handleServiceError not called');
        assert.equal(stubs.handleServiceError.args[0], 'Update user name failed: 500 There was an error');
        //assert.isTrue(stubs.error.calledWith('Update user name failed: 500 There was an error', 'error not thrown correctly'));
    });
});