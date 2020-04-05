import models from "../models/index.js"
import extend from "../utils/context.js";

export default {
    get: {
        login(context) {
            extend(context).then(function () {
                this.partial('../views/user/login.hbs');
            })
        },
        register(context) {
            extend(context).then(function () {
                this.partial('../views/user/register.hbs');
            })
        },
        logout(context) {
            models.user.logout().then((response) => {
                console.log('YOU JUST LOGGED OUT!')
                context.redirect('#/user/login');
            })
        }
    },
    post: {
        login(context) {

            const { email, password } = context.params;

            models.user.login(email, password).then((response) => {// sending to firebase  
                
                context.user = response;
                context.username = response.email
                context.isLoggedIn = true;
                context.redirect('#/home')
                console.log('YOU JUST LOGGED IN SUCCESSFULLY!')

            }).catch((e) => console.error(e))

        },
        register(context) {


            const { username, password, rePassword } = context.params;

            if (password === rePassword) {
                models.user.register(username, password) // sending to firebase
                    .then((response) => {

                        context.redirect('#/user/login');
                        //
                        console.log('YOUR REGISTRATION IS SUCCESSFUL!');
                        //
                    }).catch((e) => console.error(e))

            }
        }
    }
}