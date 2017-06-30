import model from '../model/model';

export function authenticateUser() {
    fetch('/authenticate').then(data => data.json()).then(data => {
        model.id = data.id;
    });
}
