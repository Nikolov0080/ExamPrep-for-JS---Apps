import extend from "../utils/context.js"
import models from "../models/index.js"
import docModifier from "../utils/doc_mod.js"


export default {
    get: {
        dashboard(context) {

            models.TASK.getAll().then((response) => {

                const causes = response.docs.map(docModifier); // getting the every cause/task data as an object {}

                context.TASK = causes; // adding the causes/tasks data to the context-Object so we can #each them 

                extend(context).then(function () {
                    this.partial('../views/TASK/dashboard.hbs')
                })

            }).catch((e) => console.error(e));
        },

        create(context) {

            extend(context).then(function () {
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
                extend(context).then(function () { // Load the the current taskThing view
                    this.partial('../views/task/details.hbs');
                })

            }).catch((e) => console.error(e));

        },

        edit(context) {


            const { causeId } = context.params;

            models.TASK.get(causeId).then((response) => {
                const post = docModifier(response);

                Object.keys(post).forEach((key) => {
                    context[key] = post[key]
                })
                console.log(context)


                extend(context).then(function () {
                    this.partial('../views/TASK/edit.hbs');
                })
            })
        }

    },
    post: {
        create(context) { // can add here cause/task PARAMETERS to the context.params-property

            const data = { // add params to the current cause/task 
                ...context.params,
                uid: localStorage.getItem('userId'),
                creator: localStorage.getItem('email')
            }

            models.TASK.create(data).then((response) => {
                context.redirect("#/home"); // redirecting to the page where all the records will be displayed.
            }).catch((e) => console.error(e));
        },

    },
    del: {
        close(context) {
            const { causeId } = context.params;
            models.TASK.close(causeId).then((response) => {
                context.redirect("#/home")
            })
        }
    },
    put: {
        edit(context) { // edit document-element
            const { causeId } = context.params;
console.log(causeId)
            models.TASK.get(causeId).then((response) => {
                const cause = docModifier(response);
                const { title, category, content } = context.params;

                cause.title = title;
                cause.category = category;
                cause.content = content;

                return models.TASK.edit(causeId, cause);
            }).then((response) => {
                context.redirect('#/home');
            })

        }


    }

}