import * as modelAccessor from 'src/model/modelAccessor';

export default {
    authenticateUser() {
        fetch('/authenticate').then(data => data.json()).then(data => {
            modelAccessor.setId(data.id);
        });
    }
}
