const config = require("../config/auth.config");
const userRep = require('../repositories/userRep')
const service = require('../service/service')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name,
            email: req.body.email,
            surname: req.body.surname
    };
    userRep.post(user)
    .then(x=>
        {
            res.send({ message: "User was registered successfully!" });
        }
    )
    .catch(err=>
    {
        res.status(500).send({ message: err.message });
    });

};

exports.signin = (req, res) => {
    service.getUserByUsername(req.body.username)
    .then(user => {

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
        
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};