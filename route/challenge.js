const express = require('express');
const Challenge = require('../model/challenge');
const router = express.Router();
const auth = require("../auth");

router.route('/')
    // .get(auth.verifyUser, (req, res, next) => {
    //     Challenge.find({status: "false", "chBy": {"$ne": req.user._id}})
    //     .populate({
    //         path: 'chBy'
    //     })
    //     .then((Challenge)=>{
    //         res.json(Challenge);
    //     })
    //     .catch(next);
    // })

    .get( (req, res, next) => {
        Challenge.find({status: "false"})
        .populate({
            path: 'chBy'
        })
        .then((Challenge)=>{
            res.json(Challenge);
        })
        .catch(next);
    })
    
    .post((req, res, next)=>{
        Challenge.create(req.body)
        .then((Challenge)=>{
            res.statusCodes = 201;
            res.json(Challenge);
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

router.route('/myChallenges')
.get(auth.verifyUser, (req, res, next) => {
    Challenge.find({status: "false", "chBy": req.user._id})
    .populate({
        path: 'chBy'
    })
    .then((Challenge)=>{
        res.json(Challenge);
    })
    .catch(next);
})
// router.route('/myAccepted')
// .get(auth.verifyUser, (req, res, next)=>{
//     Challenge.find({status: "true"}, "$or" [{"chBy" : req.user._id}, {"chAcceptedby": req.user._id}])
//     .populate({
//         path: 'chBy'
//     })
//     .populate({
//         path: 'chAcceptedby'
//     })
//     .then((challenge)=>{
//         res.json(challenge);
//     })
// })

// using or operator
router.route('/myAccepted')
.get(auth.verifyUser, (req, res, next)=>{
    Challenge.find({ $or: [{"chBy": req.user._id}, {"chAcceptedby": req.user._id}], status: "true" })
    .populate({
        path: 'chBy'
    })
    .populate({
        path: 'chAcceptedby'
    })
    .then((challenge)=>{
        res.json(challenge);
    })
})

router.route('/myAccepted1')
.get(auth.verifyUser,(req, res, next)=>{
    Challenge.find({status: "true", chAcceptedby: req.params.id})
    .populate({
        path: 'chBy'
    })
    .populate({
        path: 'chAcceptedby'
    })
    .then((challenge)=>{
        res.json(challenge);
    })
})

router.route('/currentChallenge')
.get(auth.verifyUser, (req, res, next)=>{
    Challenge.find({status: "false"})
    .populate({
        path: 'chAcceptedby'
    })
    .then((challenge)=>{
        res.json(challenge);
    })
})

router.route('/:id')
    .get((req, res, next)=>{
        Challenge.findById(req.params.id)
        .populate({
            path: 'chBy'
        })
        .then((Challenge)=>{
            res.json(Challenge);
        })
        .catch(next);
    })
    
    .post((req, res) => {
        res.statusCode = 405;
        res.json({message : "This method is not allowed"});
    })

    .put((req, res, next) => {
        Challenge.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .then((Challenge) => {
            res.json(Challenge)
        })
        .catch(next)
    })

    .delete((req, res, next) => {
        Challenge.findByIdAndDelete(req.params.id)
        .then((Challenge) => {
            if (Challenge == null) throw new Error("Challenge not found!");
            res.json(Challenge);
        }).catch(next);
    });


module.exports = router;
