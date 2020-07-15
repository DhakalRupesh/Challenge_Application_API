const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    chType: {
        type: String
    },
    chBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chAcceptedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chGame: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Games'
        type: String
    },
    chAmt: {
        type: String
    },
    chDate: {
        type: String
    },
    chTime: {
        type: String
    },
    chDesc: {
        type: String
    },
    chImage:{
        type: String
    },
    status: {
        type: String
    }

},{ timestamp: true });

module.exports = mongoose.model('Challenge', challengeSchema);
