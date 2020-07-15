const express = require('express');
const Result = require('../model/Result');
const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Result.find({})
        .then((Result)=>{
            res.json(Result);
        })
        .catch(next);
    })

    .post((req, res, next)=>{
        Result.create(req.body)
        .then((Result)=>{
            res.statusCodes = 201;
            res.json(Result);
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
        Result.findOne(req.param.id)
        .then((Result) => {
            if(Result == null) throw new Error("Result not found")
            res.json(Result)
        })
        .catch(next)
    })
    
    .post((req, res) => {
        res.statusCode = 405
        res.json({message : "This method is not allowed"});
    })

    .put((req, res, next) => {
        Result.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .then((Result) => {
            res.json(Result)
        })
        .catch(next)
    })

    .delete((req, res, next) => {
        Result.findOneAndDelete(req.params.id)
        .then((Result) => {
            if (Result == null) throw new Error("Result not found!");
            res.json(Result);
        }).catch(next);
    });

module.exports = router;