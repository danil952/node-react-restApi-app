const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.showResult
  );

  app.get(
    "/api/user/events",
    [authJwt.verifyToken],
    controller.getUserEvents
  );

  app.get(
    "/api/events",
    [authJwt.verifyToken],
    controller.getAllEvents
  );

  app.get(
    "/api/user/author/events",
    [authJwt.verifyToken],
    controller.getCreatedEvents
  );

  app.delete(
    "/api/user/events/:id",
    [authJwt.verifyToken],
    controller.deleteCreatedEvent
  )
  
  app.delete(
    "/api/user/records/:id",
    [authJwt.verifyToken],
    controller.deleteUserRecord
  )

  app.post(
    "/api/user/events",
    [authJwt.verifyToken],
    controller.createEvent
  )

  app.put(
    "/api/user/events/:id",
    [authJwt.verifyToken],
    controller.editEvent
  )
  app.post(
    "/api/records",
    [authJwt.verifyToken],
    controller.createRecord
  )


};