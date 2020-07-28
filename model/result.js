const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    WonBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ChallengeWon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    },
    ChBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cHacceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    confirmationSendBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    confirmation: {
        type: String
    },
    proofing: {
        type: String
    }

},{ timestamp: true });

module.exports = mongoose.model('Result', resultSchema);
