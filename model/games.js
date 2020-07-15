const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
    gName: {
        type: String
    },
    gDeveloper: {
        type: String
    },
    about: {
        type: String
    },
    gImg: {
        type: String
    }

},{ timestamp: true });

module.exports = mongoose.model('Games', gamesSchema);
