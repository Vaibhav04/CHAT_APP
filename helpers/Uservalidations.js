module.exports = function(_) {
    return {
        SignUpValidation: (req, res, next) => {
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('username', 'Username Must Not Be Less Than 5').isLength({min: 5});
            req.checkBody('email', 'email is required').notEmpty();
            req.checkBody('email', 'email is invalid').isEmail();
            req.checkBody('password', 'password is required').notEmpty();
            req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min: 5});

            req.getValidationResult()
                .then((result) => {
                    const errors = result.array();
                    const messages = [];
                    errors.forEach((error) => {
                        messages.push(error.msg)
                    });

                    req.flash('error', messages);
                    res.redirect('/signup');
                })
                .catch((err) => {
                    return next();
                })
        },

        LoginValidation: (req, res, next) => {
            req.checkBody('email', 'email is required').notEmpty();
            req.checkBody('email', 'email is invalid').isEmail();
            req.checkBody('password', 'password is required').notEmpty();
            req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min: 5});

            req.getValidationResult()
                .then((result) => {
                    const errors = result.array();
                    const messages = [];
                    errors.forEach((error) => {
                        messages.push(error.msg)
                    });

                    req.flash('error', messages);
                    res.redirect('/');
                })
                .catch((err) => {
                    return next();
                })
        }
    }
}