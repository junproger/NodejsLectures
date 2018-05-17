const path = require("path");
const UserModel = require("../model/user");

module.exports = {
    getHomePage(req, res, next) {
        try {
            let user = null;

            if (req.isAuthenticated()) {
                user = req.user;
            }
            
            res.render(path.resolve(__dirname, "../view/home.ejs"), {
                user: user
            });
        } catch (err) {
            next(err);
        }
    },

    getAboutPage(req, res, next) {
        try {
            res.render(path.resolve(__dirname, "../view/about.ejs"));
        } catch (err) {
            next(err);
        }
    },

    //TODO вынести в отдельный controller все что ниже 
    getSignUpPage(req, res, next) {
        try {
            res.render(path.resolve(__dirname, "../view/signup.ejs"));
        } catch (err) {
            next(err);
        }
    },

    signup(req, res, next) {
        try {
            let user = UserModel.create(req.body.email, req.body.username, req.body.password);
            res.redirect("/login");
        } catch (err) {
            next(err);
        }
    },

    getLoginPage(req, res, next) {
        try {
            res.render(path.resolve(__dirname, "../view/login.ejs"));
        } catch(err) {
            next(err);
        }   
    },

    login(req, res, next) {
        try {
            res.redirect("/");
        } catch(err) {
            next(err);
        }   
    }
};