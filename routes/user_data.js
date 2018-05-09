var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var user_db = [
    {
        uname: "Jane", password: "305", roles: [
            "manager",
            "user",
            "editor"
        ]
    },
    {
        uname: "Mary", password: "306", roles: [
            "manager",
            "user"
        ]
    },
    {
        uname: "Suslik", password: "404", roles: [
            "manager",
            "admin",
            "editor"
        ]
    }
];

function get_token(user, secret) {
    var token = jwt.sign(user, secret, { expiresIn: 2000 });

    return token;
}

function get_user(token, secret) {
    var user = jwt.verify(token, secret);

    return user;
}

function check_login(login, password) {

    var found_user = user_db.find(function(x){

        if(x.login == login && x.password == password){
            return true;
        } else {
            return false;
        }
        
        if(found_user){
            return {
                is_authenticated: true,
                user: {
                    username: found_user.name,
                    roles: found_user.roles
                }
            }
        }else{
            return {
                is_authenticated: false,
                user: null
            }
        }
    });
}
/* GET home page. */
router.get('*', function(req, res, next) {
  req.data = { user: {username: 'SomeUser', roles: ["R1", "ROLE2", "ROLE_3"]} }
  next();
});

module.exports = {
    router: router,
    check_login: check_login,
    get_token: get_token,
    get_user: get_user
};