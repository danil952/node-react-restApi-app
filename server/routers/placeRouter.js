const Router = require('express').Router;
const placeRep = require('../repositories/placeRep')

const placeRouter = Router();
placeRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await placeRep.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const place = {
                name: req.body.name,
                map: req.body.map,
            };
            res.send(await placeRep.post(place));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
placeRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await placeRep.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const place = {
                name: req.body.name,
                map: req.body.map,
            };
            res.send(await placeRep.put(id, place));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await placeRep.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = placeRouter;