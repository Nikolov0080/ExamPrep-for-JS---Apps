import controllers from "../controllers/index.js";

const app = Sammy('#ho', function() {
    // include a plugin
    this.use('Handlebars', 'hbs');

    // HOME
    this.get('#/home', controllers.home.get.home);

    // USER 
    this.get('#/user/login', controllers.user.get.login);
    this.get('#/user/register', controllers.user.get.register);

    this.post('#/user/login', controllers.user.post.login);
    this.post('#/user/register', controllers.user.post.register);


    // CAUSE
});

(() => {
    app.run('#/home');

})();