import models from "../models/index.js";


export default {
    get: {
        login(context) {
            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function() {
                this.partial('../views/user/login.hbs')
            })
        },

        register(context) {
            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function() {
                this.partial('../views/user/register.hbs')
            })
        }
    },
    post: {
        login(context) {
            console.log(context.params)
        },

        register(context) {

            const { username, password, rePassword } = context.params

            if (password === rePassword) {
                models.user.register([username, password])
            } else {
                alert('FUCK!')
            }

        }

    }
}