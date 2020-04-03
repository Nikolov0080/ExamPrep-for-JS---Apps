import extend from "../utils/context.js"
import models from "../models/index.js"
import docModifier from "../utils/doc_mod.js"


export default {
    get: {
        dashboard(context) {

            models.TASK.getAll().then((response) => {
                // const cause = docModifier(response);

                console.log(localStorage.getItem('userId'))
                const causes = response.docs.map(docModifier); // getting the every cause/task data as an object {}

                context.TASK = causes; // adding the causes/tasks data to the context-Object so we can #each them 

                extend(context).then(function() {
                    this.partial('../views/TASK/dashboard.hbs')
                })

            }).catch((e) => console.error(e));
        },

        create(context) {

            extend(context).then(function() {
                this.partial('../views/TASK/create.hbs');
            })
        },

        details(context) {

            const { causeId } = context.params // <-- current taskThing ID  

            models.TASK.get(causeId).then((response) => {

                const cause = docModifier(response);

                // add each cause/task key-value to the context
                Object.keys(cause).forEach((key) => {
                        context[key] = cause[key]
                    })
                    //
                    // is this the user that created the cause/task boolean
                context.canDonate = cause.uid !== localStorage.getItem('userId');
                //
                // context.cause = cause; //   <-- adding the current cause/task to the context-Object 
                extend(context).then(function() { // Load the the current taskThing view
                    this.partial('../views/TASK/details.hbs');
                })

            }).catch((e) => console.error(e));

        }
    },
    post: {
        create(context) { // can add here cause/task PARAMETERS to the context.params-property

            const data = { // add params to the current cause/task 
                ...context.params,
                uid: localStorage.getItem('userId'),
                likes: 0,
                listens: 0
            }

            models.TASK.create(data).then((response) => {
                context.redirect("#/TASK/dashboard"); // redirecting to the page where all the records will be displayed.
            }).catch((e) => console.error(e));
        },

    },
    del: {
        close(context) {
            const { causeId } = context.params;
            models.TASK.close(causeId).then((response) => {
                context.redirect("#/TASK/dashboard")
            })
        }
    },
    put: {
        like(context) { // update document-element
            const { causeId } = context.params;
            // const { donatedAmount } = context.params;

            models.TASK.get(causeId).then((response) => {
                const cause = docModifier(response);

                cause.likes++;
                // cause.donors.push(localStorage.getItem('email') + ' ')
                return models.TASK.like(causeId, cause);
            }).then((response) => {
                context.redirect('#/TASK/dashboard');
            })

        },
        listen(context) { //listen to the song
            const { causeId } = context.params;

            models.TASK.get(causeId).then((response) => {
                const cause = docModifier(response);

                cause.listens++;
                return models.TASK.like(causeId, cause);
            }).then((response) => {
                context.redirect('#/TASK/dashboard');
            })
        }

    }

}