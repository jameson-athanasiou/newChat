import model from '../model/model';

export function updateUsername (username) {
    const postData = {
        username,
        id: model.id
    };

    fetch('/user', {
        method: 'post',
        "Content-type": "application/json",
        body: JSON.stringify(postData)
    }).then(data => data.json()).then(data => {
        //this._handleResponse(data);
    });


}

function _handleResponse(data, xhr) {
    let retVal = '';
    switch (xhr.status) {
        case 304:
            retVal = '304';
    }

    return retVal;
}
