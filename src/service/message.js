import $ from 'jquery';
import model from '../model/model';

export function sendMessage (message) {
    $.ajax({
        "Content-Type": "application/json",
        "method": "POST",
        "url": "/message",
        "data": {
            "message": message,
            "client": model.key
        }
    }).done(function(data) {
        console.info(data);
    });
}
