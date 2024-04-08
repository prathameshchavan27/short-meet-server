const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
})

const Room = mongoose.model("Room", roomSchema);
module.exports = Room