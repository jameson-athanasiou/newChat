import Model from './model';

export function getId() {
    return Model.id;
}

export function setId(id) {
    Model.id = id;
}

export function addError(error) {
    Model.errors.push(error);
}
