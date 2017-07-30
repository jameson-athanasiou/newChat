import user from 'src/service/user';
import * as modelAccessor from 'src/model/modelAccessor';
import errorHandler from 'src/model/errorHandler';
import td from 'testdouble';

describe('User tests', function () {

    const doubles = {};

    before(function () {
        td.config({
            ignoreWarnings: true
        });
    });

    beforeEach(function () {
        doubles.fetch = td.replace(window, 'fetch');
        doubles.handleServiceError = td.replace(errorHandler, 'handleServiceError');
    });

    after(function () {
        td.config({
            ignoreWarnings: false
        });
    });

    afterEach(function () {
        td.reset();
    }); 

    it('When updating the user name Then fetch is called with the correct endpoint and options', function () {
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

        doubles.getId = td.replace(modelAccessor, 'getId');
        td.when(doubles.getId()).thenReturn('1234');       
        td.when(doubles.fetch(td.matchers.anything(), td.matchers.anything())).thenReturn(Promise.resolve());

        user.updateUsername(username);

        td.verify(doubles.fetch('/user', expectedHeaders));
    });

    it('Given a fetch error When updating the user name Then the error is logged', function () {
        doubles.getId = td.replace(modelAccessor, 'getId');
        td.when(doubles.getId()).thenReturn('1234'); 

        const prom = Promise.resolve({
            ok: false,
            status: 500,
            statusText: 'There was an error'
        });

        td.when(doubles.fetch('/user', td.matchers.anything())).thenReturn(prom);
         
        user.updateUsername();
        prom.then(() => {
            td.verify(doubles.handleServiceError(500, 'updateUsername'));
        });
    });
});