export default function (context) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            
            context.isLoggedIn = true;
            context.username = user.email;
            //
            context.userId = user.uid;
            context.username = user.email;
            //
            localStorage.setItem('email', user.email);
            localStorage.setItem('userId', user.uid);
            // ...
        } else {
            // User is signed out.

            context.userId = undefined;
            context.username = undefined;
            context.isLoggedIn = null;
            
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
        }
    });

    return context.loadPartials({
        header: '../views/common/header.hbs',
        footer: '../views/common/footer.hbs'
    })

}
