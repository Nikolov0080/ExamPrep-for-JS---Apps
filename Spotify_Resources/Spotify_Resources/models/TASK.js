export default {
    create(data) {
        // data = { ...data } // duplicate the sammy object into regular object
        return firebase.firestore().collection('TASK').add(data) // change the collectionName just hereto create new record on the DB
    },
    getAll() {
        return firebase.firestore().collection('TASK').get(); // get all the causes/tasks from the DB
    },
    get(id) {
        return firebase.firestore().collection('TASK').doc(id).get(); // get document by ID
    },
    close(id) {
        return firebase.firestore().collection('TASK').doc(id).delete(); // delete by ID
    },
    like(id, cause) {
        return firebase.firestore().collection('TASK').doc(id).update(cause); // update an element by ID
    },
    listen(id, cause) {
        return firebase.firestore().collections('TASK').doc(id).update(cause); // update an element by ID
    }
}