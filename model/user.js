const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    email: {
        type: String
    },
    uname:{
        type: String
    },
    pass: {
        type: String
    },
    amt: {
        type: String,
    },
    phone: {
        type: String,
    },
    proImg: {
        type: String,
    }

},{ timestamp: true });

module.exports = mongoose.model('User', userSchema);
