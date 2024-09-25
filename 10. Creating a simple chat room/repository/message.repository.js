const Message = require('../models/message.model');

class MessageRepository {

    async create(data) {
        try {
            const message = await Message.create(data);
            return message;
        } catch (error) {
            console.loog(error);
            return error;
        }
    }

    async getAll() {
        try {
            const messages = await Message.find({});
            return messages;
        } catch (error) {
            console.log(error);
            return error;
        }
    } 
}

module.exports = MessageRepository;