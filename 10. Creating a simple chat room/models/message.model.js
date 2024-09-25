const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
}, {timestamps: true});

const Message = mongoose.model('message', messageSchema);
module.exports = Message;