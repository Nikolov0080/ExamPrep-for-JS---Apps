import foo from "../utils/HF.js";
import extend from "../utils/context.js";


export default {
    get: {
        home(context) {
            foo(context).then(function() {
                this.partial('../views/home/home.hbs');
                extend(context);
            })
        }
    }
}