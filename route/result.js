const express = require('express');
const Result = require('../model/Result');
const router = express.Router();
const auth = require("../auth");

router.route('/')
    .get((req, res, next) => {
        Result.find({})
        .then((Result)=>{
            res.json(Result);
        })
        .catch(next);
    })

    // .get(auth.verifyUser, (req, res, next) => {
    //     Result.find({ confirmation: "waiting" })
    //     .populate({
    //         path : 'WonBy'
    //     })
    //     .populate({
    //         path: "ChallengeWon"
    //     })
    //     .populate({
    //         path: "ChBy"
    //     })
    //     .populate({
    //         path : 'cHacceptedBy'
    //     })
    //     .populate({
    //         path: "confirmationSendBy"
    //     })
    //     .then((Challenge)=>{
    //         res.json(Challenge);
    //     })
    //     .catch(next);
    // })

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

router.route('/chresult')
.get((req, res, next) => {
        Result.find( req.param.id )
        .then((Result)=>{
            res.json(Result);
        })
        .catch(next);
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