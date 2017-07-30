import auth from 'src/service/auth';
import * as modelAccessor from 'src/model/modelAccessor';
import td from 'testdouble';

describe('auth tests', function () {

    const doubles = {};

    before(function () {
        td.config({
            ignoreWarnings: true
        });
    });

    beforeEach(function () {
        doubles.fetch = td.replace(window, 'fetch');
    });

    after(function () {
        td.config({
            ignoreWarnings: false
        });
    });

    afterEach(function () {
        td.reset();
    });

    it('When authenticating the user Then fetch should be called with the correct endpoint', function () {
        td.when(doubles.fetch(td.matchers.anything())).thenReturn(Promise.resolve());
        auth.authenticateUser();
        td.verify(doubles.fetch('/authenticate'));
    });

    it('When authenticating the user Then the user id is set on the model', function () {
        const prom = Promise.resolve({
            id: 'test-id'
        });
        
        doubles.setId = td.replace(modelAccessor, 'setId');
        td.when(doubles.fetch('/authenticate')).thenResolve(Promise.resolve({
            json: () => prom
        }));
         
        auth.authenticateUser();
        prom.then(() => {
            td.verify(doubles.setId('test-id'));
        });
    }); 
});