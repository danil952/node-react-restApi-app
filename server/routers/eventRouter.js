const Router = require('express').Router;
const eventRep = require('../repositories/eventRep')

const eventRouter = Router();
eventRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await eventRep.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const event = {
                author_id: req.body.author_id,
                name: req.body.name,
                category_id: req.body.category_id,
                place_id: req.body.place_id,
                description: req.body.description,
                event_date: req.body.event_date
            };
            res.send(await eventRep.post(event));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
eventRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await eventRep.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const event = {
                author_id: req.body.author_id,
                name: req.body.name,
                category_id: req.body.category_id,
                place_id: req.body.place_id,
                description: req.body.description,
                event_date: req.body.event_date
            };
            res.send(await eventRep.put(id, event));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await eventRep.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = eventRouter;