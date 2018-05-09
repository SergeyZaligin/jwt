var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var user_db = [
    {
        name: "Jane", password: "305", roles: [
            "manager",
            "user",
            "editor"
        ]
    },
    {
        name: "Mary", password: "306", roles: [
            "manager",
            "user"
        ]
    },
    {
        name: "Suslik", password: "404", roles: [
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

        if(x.name == login && x.password == password){
            return true;
        } else {
            return false;
        }
    });
    
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
   
}
/* GET home page. */
router.get('*', function(req, res, next) {
//   req.data = { user: {username: 'SomeUser', roles: ["R1", "ROLE2", "ROLE_3"]} }
  var data = {};
  var token = req.cookies["auth_token"];
  if(token){
      data.user = get_user(token, req.app.get('secret'));
  }
  req.data = data;
  next();
});

module.exports = {
    router: router,
    check_login: check_login,
    get_token: get_token,
    get_user: get_user
};