const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../model/user");

//После логина вызывается под капотом 
//метод serializeUser и  user.email сохраняется в сеансе.
passport.serializeUser(function(user, done) {
    done(null, user.email);
});

//При последующих запросах вызывается deserializeUser, который возвращает
//email сохраненный в сеансе. По этому имейлу получаем объект юзера из модели 
//и передаем его дальше при помощи  done. Именно после этого действия данные 
//о пользователе становятся доступными в "req.user".
passport.deserializeUser(function(email, done) {
    let user = UserModel.find(email);
    done(null, user);
});


/*
    Локальная стратегия описывает то, как должны обрабатываться
    данные отправленные пользователем при логине. 
*/
passport.use(new LocalStrategy({
    usernameField: "email", 
    passwordField: "password"
}, (email, password, done) => {
    try {
        let user = UserModel.find(email);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        done(err);
    }
}));

module.exports = passport;

