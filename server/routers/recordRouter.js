const Router = require('express').Router;
const recordRep = require('../repositories/recordRep')

const recordRouter = Router();
recordRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await recordRep.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const record = {
                event_id: req.body.event_id,
                user_id: req.body.user_id,
            };
            res.send(await recordRep.post(record));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
recordRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await recordRep.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const record = {
                event_id: req.body.event_id,
                user_id: req.body.user_id,
            };
            res.send(await recordRep.put(id, record));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await recordRep.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = recordRouter;