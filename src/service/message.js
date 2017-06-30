import model from '../model/model';

export function sendMessage (message) {

    const postData = {
        message: message,
        client: model.key
    };

    fetch('/message', {
        method: 'post',
        body: JSON.stringify(postData)
    }).then(data => data.json()).then(data => {
        console.info(data);
    });





/*

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

    */




}
