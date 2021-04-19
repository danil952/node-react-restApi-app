const Router = require('express').Router;
const categoryRep = require('../repositories/categoryRep')

const categoryRouter = Router();
categoryRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await categoryRep.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const category = {
                name: req.body.name
            };
            res.send(await categoryRep.post(category));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
categoryRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await categoryRep.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const category = {
                name: req.body.name
            };
            res.send(await categoryRep.put(id, category));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await categoryRep.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = categoryRouter;