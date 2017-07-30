import { addError } from './modelAccessor';
import constants from '../util/constants';

export default {

    handleFatalError(errorCode, message) {
        this._processError(constants.ERROR.FATAL, errorCode, message);
    },

    handleNonFatalError(errorCode, message) {
        this._processError(constants.ERROR.NON_FATAL, errorCode, message);
    },

    handleServiceMessage(errorCode, serviceCall, message, isFatal) {
        const msg = `{serviceCall} failure: ${errorCode} - ${message}`;
        isFatal ? this.handleFatalError(errorCode, message) : this.handleNonFatalError(errorCode, message);
    },

    _processError(type, code, message) {
        addError({
            type,
            code,
            message
        });
        this._printError(message);
    },

    _printError(msg) {
        console.error(msg);
    }
};