const _ = require("lodash");
const users = [{
    email: "a@a.com",
    username: "Alex",
    password: "pass"
}];

module.exports = {
    create(email, username, password) {
        let user = {
            email,
            username,
            password
        };

        users.push(user);

        return user;
    },
    find(email) {
        return _.find(users, (user) => { 
            return user.email === email;
        });
    }
}