import * as modelAccessor from '../model/modelAccessor';

export function sendMessage (message) {

    const postData = {
        message,
        id: modelAccessor.getId()
    };

    fetch('/message', {
        method: 'post',
        body: JSON.stringify(postData)
    }).then(data => data.json()).then(data => {
        console.info(data);
    });
}
