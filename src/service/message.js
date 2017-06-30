import model from '../model/model';

export function sendMessage (message) {

    const postData = {
        message: message,
        id: model.id
    };

    fetch('/message', {
        method: 'post',
        body: JSON.stringify(postData)
    }).then(data => data.json()).then(data => {
        console.info(data);
    });
}
