module.exports = function(_, passport, Uservalidations) {
    return {
        setRouting: function(router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.home);

            router.post('/signup', Uservalidations.SignUpValidation, this.postSignUp);
            router.post('/', Uservalidations.LoginValidation, this.postLogin);
        },

        indexPage: function(req, res) {
            const errors = req.flash('error');
            return res.render('index', {title: 'Chatapp | Login', messages: errors, hasErrors: errors.length > 0});
        },

        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true,
        }),

        getSignUp: function(req, res) {
            const errors = req.flash('error');
            return res.render('signup', {title: 'Chatapp | Signup', messages: errors, hasErrors: errors.length > 0});
        },

        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true,
        }),

        home: function(req, res) {
            return res.render('home');
        }
    }
}