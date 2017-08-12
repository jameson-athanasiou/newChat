import HomePage from 'src/components/HomePage';
import chai from 'chai';
import td from 'testdouble';

describe('HomePage tests', function () {

    const doubles = {};
    const assert = chai.assert;

    beforeEach(function () {
        doubles.fetch = td.replace(window, 'fetch');
    });

    afterEach(function () {
        td.reset();
    });

    it('When instantiating the home page Then the state is set correctly', function () {
        const homepage = new HomePage();

        assert.deepEqual(homepage.state, {
            receivedMessages: [],
            text: ''
        }, 'state was not correctly constructed');
    });
});
