import $ from 'jquery';
import model from '../model/model';

export function updateUsername (username) {
    $.ajax({
        "Content-Type": "application/json",
        "method": "POST",
        "url": "/user",
        "data": {
            username,
            "client": model.key
        }
    }).done((data, something, xhr) => {
        this._handleResponse(data, xhr);
    });
}

function _handleResponse(data, xhr) {
    switch (xhr.status) {
        case 304:
            break;      
    }
}
