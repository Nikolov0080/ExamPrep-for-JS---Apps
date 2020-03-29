export default {
    get: {
        home(context) {
            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs"
            }).then(function() {
                this.partial('../views/home/home.hbs')
            })
        }
    }
}