export default {
    register(data) {

        const [email, password] = data;

        firebase.auth().createUserWithEmailAndPassword(email, password)
    },
    login(data) {

    }

}