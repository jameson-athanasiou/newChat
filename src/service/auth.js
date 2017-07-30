import * as modelAccessor from '../model/modelAccessor';

export function authenticateUser() {
    fetch('/authenticate').then(data => data.json()).then(data => {
        modelAccessor.setId(data.id);
    });
}
