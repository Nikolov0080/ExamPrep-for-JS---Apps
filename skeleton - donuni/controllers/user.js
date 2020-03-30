import models from "../models/index.js";
import extend from "../utils/HF.js";

export default {
    get: {
        login(context) {
            extend(context).then(function () {
                this.partial('../views/user/login.hbs')
            })
        },

        register(context) {
            extend(context).then(function () {
                this.partial('../views/user/register.hbs')
            })
        },
        logout(context) {

            models.user.logout().then((response) => {
                context.redirect("#/home");
            });
        }
    },
    post: {
        login(context) {

            const { username, password } = context.params;

            models.user.login(username, password)
                .then((response) => {

                    // context.user = response;
                    // context.username = response.email;
                    context.redirect('#/home');
                    // context.isLoggedIn = true;
                })
                .catch((e) => {
                    console.error(e)
                })
        },

        register(context) {

            const { username, password, rePassword } = context.params

            if (password === rePassword) {
                models.user.register(username, password)
                    .then((response) => {
                        context.redirect('#/user/login')
                    })
                    .catch((e) => console.error(e));

            } else {
                alert('FUCK!')
            }

        }

    }
}