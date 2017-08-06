import * as modelAccessor from 'src/model/modelAccessor';

export function sendMessage (message) {

    const postData = {
        message,
        id: modelAccessor.getId()
    };

    fetch('/message', {
        method: 'post',
        body: JSON.stringify(postData)
    });
}
