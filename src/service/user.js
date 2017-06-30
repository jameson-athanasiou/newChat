import model from '../model/model';

export function updateUsername (username) {
    const postData = {
        username,
        client: model.key
    };

    fetch('/user', {
        method: 'post',
        "Content-type": "application/json",
        body: JSON.stringify(postData)
    }).then(data => data.json()).then(data => {
        this._handleResponse(data);
    });


}

function _handleResponse(data, xhr) {
    switch (xhr.status) {
        case 304:
            break;
    }
}
