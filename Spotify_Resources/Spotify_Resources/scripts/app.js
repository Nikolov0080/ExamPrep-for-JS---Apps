import controllers from "../controllers/index.js";

const app = Sammy('#root', function() {

    this.use("Handlebars", "hbs");

    // HOME
    this.get('#/home', controllers.home.get.home);

    // USER
    this.get('#/user/login', controllers.user.get.login);
    this.get('#/user/register', controllers.user.get.register);
    this.get('#/user/logout', controllers.user.get.logout);

    this.post('#/user/login', controllers.user.post.login);
    this.post('#/user/register', controllers.user.post.register);

    // TASK

    this.get("#/TASK/dashboard", controllers.TASK.get.dashboard);
    this.get("#/TASK/create", controllers.TASK.get.create);
    // this.get('#/TASK/details/:causeId', controllers.cause.get.details); // "causeId" <-- id will be stored in this variable inside the "context.params = causeId"

    this.post("#/TASK/create", controllers.TASK.post.create);
    this.get("#/TASK/close/:causeId", controllers.TASK.del.close); // delete by ID
    this.get("#/TASK/like/:causeId", controllers.TASK.put.like); // like by ID 
    this.get("#/TASK/listen/:causeId", controllers.TASK.put.listen); // like by ID 

});



(() => {
    app.run("#/home");
})()