import * as modelAccessor from 'src/model/modelAccessor';
import errorHandler from 'src/model/errorHandler';
import constants from 'src/util/constants';
import td from 'testdouble';

describe('errorHandler tests', function () {

    const doubles = {};

    afterEach(function () {
        td.reset();
    });

    it('When handling a fatal service error Then the correct method is called', function () {
        doubles.handleFatalError = td.replace(errorHandler, 'handleFatalError');

        errorHandler.handleServiceError('500', 'theCall', 'error happened', true);

        td.verify(doubles.handleFatalError('500', 'theCall failure: 500 - error happened'));
    });

    it('When handling a NON fatal service error Then the correct method is called', function () {
        doubles.handleNonFatalError = td.replace(errorHandler, 'handleNonFatalError');

        errorHandler.handleServiceError('500', 'theCall', 'error happened');

        td.verify(doubles.handleNonFatalError('500', 'theCall failure: 500 - error happened'));
    });

    it('When handling a fatal error Then the error is processed with the correct parameters', function () {
        doubles._processError = td.replace(errorHandler, '_processError');
        errorHandler.handleFatalError('404', 'errored out');
        td.verify(doubles._processError(constants.ERROR.FATAL, '404', 'errored out'));
    });

    it('When handling a NON fatal error Then the error is processed with the correct parameters', function () {
        doubles._processError = td.replace(errorHandler, '_processError');
        errorHandler.handleNonFatalError('404', 'errored out');
        td.verify(doubles._processError(constants.ERROR.NON_FATAL, '404', 'errored out'));
    });

    it('When processesing an error Then the error is added to the model', function () {
        doubles.addError = td.replace(modelAccessor, 'addError');
        doubles.consoleError = td.replace(console, 'error');

        errorHandler._processError(constants.ERROR.FATAL, '400', 'the message');

        td.verify(doubles.addError({
            type: constants.ERROR.FATAL,
            code: '400',
            message: 'the message'
        }));
    });

    it('When processesing an error Then the error is printed to the console', function () {
        doubles.addError = td.replace(modelAccessor, 'addError');
        doubles._printError = td.replace(errorHandler, '_printError');

        errorHandler._processError(constants.ERROR.FATAL, '400', 'error message');

        td.verify(doubles._printError('error message'));
    });

    it('When _printError is called Then an error is logged to the console', function () {
        doubles.consoleError = td.replace(console, 'error');
        errorHandler._printError('the error');
        td.verify(doubles.consoleError('the error'));
    });
});