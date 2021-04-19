const service = require('../service/service')

const checkDuplicateUsernameOrEmail = (req, res, next) => {

    service.getUserByUsername(req.body.username)
    .then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
      next();
    });
  };
  

  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
  };
  
  module.exports = verifySignUp;