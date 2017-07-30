import * as modelAccessor from 'src/model/modelAccessor';
import errorHandler from 'src/model/errorHandler';

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
                errorHandler.handleServiceError(response.status, 'updateUsername');
            }
        });
    },

    _handleError(msg) {
        console.error(msg);
    }
};

