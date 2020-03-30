import extend from "../utils/HF.js";
import models from "../models/index.js"
import docModifier from "../utils/doc-mod.js";
import isLogged from "../utils/context.js";

export default {
    get: {
        dashboard(context) {

            models.cause.getAll().then((response) => {

                const causes = response.docs.map(docModifier);

                context.causes = causes;
                // console.log(causes);

                extend(context)
                    .then(function () {
                        this.partial('../views/causes/dashboard.hbs')

                    })
            })
        },
        create(context) {
            extend(context)
                .then(function () {
                    this.partial('../views/causes/create.hbs')
                })
        },
        details(context) {

            const { causeId } = context.params;

            models.cause.get(causeId).then((response) => {
                const cause = docModifier(response);

                Object.keys(cause).forEach(x => {
                    context[x] = cause[x]
                })

                const canDonate = cause.uid !== localStorage.getItem('userId');
                context.canDonate = canDonate;

                extend(context).then((function () {
                    this.partial("../views/causes/details.hbs");
                }))



            }).catch((e) => console.error(e))
            // extend(context)
            // .then(function(){
            //     this.partial("../views/causes/details.hbs")
            // })
        }
    },
    post: {
        create(context) {

            const data = {
                ...context.params,
                uid: localStorage.getItem('userId'),
                collectedFunds: 0,
                donors: []
            }


            models.cause.create(data).then((response) => {
                console.log(response)
                context.redirect('#/cause/dashboard')
            }).catch((e) => {
                console.error(e);
            })
        }
    },
    del: {
        close(context) {
            const { causeId } = context.params;
            models.cause.close(causeId).then(() => {
                context.redirect('#/cause/dashboard')
            })
        }
    },
    put: {
        donate(context) {
            const { donateAmount, causeId } = context.params;

            models.cause.get(causeId).then((response) => {
                const cause = docModifier(response);
                cause.collectedFunds += Number(donateAmount);
                cause.donors.push(localStorage.getItem('userEmail') + ' - $' +donateAmount );
                return models.cause.donate(causeId, cause)
            })
                .then((response) => {
                    context.redirect('#/cause/dashboard');
                })
        }
    }
}