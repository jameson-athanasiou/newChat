import model from '../model/model';

export function authenticateUser() {
  fetch('/auth').then(data => data.json()).then(data => {
    model.key = data.key;
  });
}
