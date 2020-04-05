import extend from "../utils/context.js"
import docModifier from "../utils/doc_mod.js"
import models from "../models/index.js"

export default {
    get: {
        home(context) {


            models.TASK.getAll().then((response) => {

                const causes = response.docs.map(docModifier); // getting the every cause/task data as an object {}

                // add each cause/task key-value to the context
                Object.keys(causes[0]).forEach((key) => {
                    context[key] = causes[0][key]
                });

                context.forJS = [];
                context.forCS = [];
                context.forPython = [];
                context.forJava = [];

                causes.forEach(x => {

                    if (x.category == 'JavaScript') {
                        context.JavaScript = true;

                        context.forJS.push(x)
                    }

                    if (x.category == 'C#') {
                        context.CS = true;

                        context.forCS.push(x)
                    }

                    if (x.category == 'Python') {
                        context.Python = true;

                        context.forPython.push(x)
                    }

                    if (x.category == 'Java') {
                        context.Java = true;

                        context.forJava.push(x)
                    }

                })




                // if (context.category == 'JavaScript') {
                //     context.JavaScript = true;
                //     context.forJS = causes
                // }

                // if (context.category == 'JavaScript') {
                //     context.JavaScript = true;
                //     context.forJS = causes
                // }

                // if (context.category == 'JavaScript') {
                //     context.JavaScript = true;
                //     context.forJS = causes
                // }

                // context.TASK = causes[0]; // adding the causes/tasks data to the context-Object so we can #each them 

                console.log(context.title)

                extend(context).then(function () {
                    this.partial('../views/home/home.hbs');
                })

            }).catch((e) => console.error(e));




        }
    }
}