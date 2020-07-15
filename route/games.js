const express = require('express');
const Games = require('../model/games');
const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Games.find({})
        .then((games)=>{
            res.json(games);
        })
        .catch(next);
    })

    .post((req, res, next)=>{
        Games.create(req.body)
        .then((games)=>{
            res.statusCodes = 201;
            res.json(games);
        })
        .catch(next);
    })

    .put((req, res) => {
        res.statusCode = 405;
        res.json({message : "This method is not allowed"});
    })
    
    .delete((req, res) => {
        res.statusCode = 405;
        res.json({message : "This method is not allowed"});
    })

router.route('/:id')
    .get((req, res, next)=>{
        Games.findOne(req.param.id)
        .then((games) => {
            if(games == null) throw new Error("games not found")
            res.json(games)
        })
        .catch(next)
    })
    
    .post((req, res) => {
        res.statusCode = 405
        res.json({message : "This method is not allowed"});
    })

    .put((req, res, next) => {
        Games.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .then((games) => {
            res.json(games)
        })
        .catch(next)
    })

    .delete((req, res, next) => {
        Games.findOneAndDelete(req.params.id)
        .then((games) => {
            if (games == null) throw new Error("games not found!");
            res.json(games);
        }).catch(next);
    });


module.exports = router;
