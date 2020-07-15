const express = require('express');
const user = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../auth');

router.get('/users', (req, res, next) => {
    user.find({})
        .then((user) => {
            res.json(user);
        }).catch(next);
});

router.get('/users/:id', (req, res, next) => {
    user.findOne({ _id: req.params.id })
        .then((user) => {
            if (user == null) throw new Error("user not found!")
            res.json(user);
        }).catch(next);
})

router.put('/upBp/:id', (req, res, next) => {
    user.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then((user) => {
        res.json(user)
    })
    .catch(next)
})

router.post('/register', (req, res, next) => {
    let password = req.body.pass;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!!')
        } user.create({
            fname: req.body.fname,
            email: req.body.email,
            uname: req.body.uname,
            pass: hash,
            amt: req.body.amt,
            phone: req.body.phone,
            proImg: req.body.proImg
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET)
            res.json({ status: "Signup success", user: user._id, token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    user.findOne({ uname: req.body.uname })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.pass, user.pass)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('username or password didnot match');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });

                    }).catch(next);
            }
        }).catch(next);
})

// router.get('/retriveme', auth.verifyUser, (req, res, next) => {
//     user.findById(req.user._id).then(user => {
//         res.json(user);
//     })
// });

router.get('/retriveme', auth.verifyUser, (req, res, next) => {
   res.json({
       _id: req.user._id,
       fname: req.user.fname,
       email: req.user.email,
       uname: req.user.uname,
       pass: req.user.pass,
       amt: req.user.amt,
       phone: req.user.phone,
       proImg: req.user.proImg
   })
});

router.put('/updateme', auth.verifyUser, (req, res, next) => {
    user.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
    .then((user) => {
        res.json
            ({
                _id: user._id,
                fname: req.body.fname,
                email: req.body.email,
                uname: req.body.uname,
                pass: req.body.pass,
                amt: req.body.amt,
                phone: req.body.phone,
                proImg: req.body.proImg,
            })
    }).catch(next);
});

router.post('/checkPassword', auth.verifyUser, (req, res, next) => {
    user.findOne({ uname: req.user.uname })
        .then((user) => {

            bcrypt.compare(req.body.pass, user.pass)
                .then((isMatch) => {
                    if (!isMatch) {
                        let err = new Error('Password does not match');
                        err.status = 401;
                        return next(err);
                    }

                    res.json({ status: 'true' });
                    console.log(true);
                }).catch(next);

        });
});

router.route('/:id/changePassword')
    .put(auth.verifyUser, (req, res, next) => {
        let password = req.body.password;

        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                throw new Error('Problem hashing password');
            }
            const newUser = {
                "password": hash
            }
            user.findByIdAndUpdate(req.user._id, { $set: newUser }, { new: true })
                .then((user) => {
                    res.json(user);
                }).catch(next);
        });
    });



module.exports = router;