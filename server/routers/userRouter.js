const Router = require('express').Router;
const userRep = require('../repositories/userRep')

const userRouter = Router();
userRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await userRep.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                surname: req.body.surname,
            };
            res.send(await userRep.post(user));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
userRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await userRep.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const user = {
                name: req.body.name,
                email: req.body.email,
                surname: req.body.surname,
            };
            res.send(await userRep.put(id, user));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await userRep.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });


module.exports = userRouter;