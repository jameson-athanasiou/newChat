import * as modelAccessor from '../model/modelAccessor';
import errorHandler from '../model/errorHandler';

export default {
    updateUsername(username) {
        const postData = {
            username,
            id: modelAccessor.getId()
        };

        fetch('/user', {
            method: 'post',
            'Content-type': 'application/json',
            body: JSON.stringify(postData)
        }).then(response => {
            if (!response.ok) {
                errorHandler.handleServiceMessage(response.status, 'updateUsername');
            }
        });
    },

    _handleError(msg) {
        console.error(msg);
    }
};

