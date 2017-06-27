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
    });
}
