const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: ({
        type: String
    }),
    email: ({
        type: String,
        unique: true
    }),
    massage: ({
        type: String
    }),
    date: ({
        type: Date,
        default: Date.now
    })
})

const MyModel = mongoose.model('register', schema);

module.exports = MyModel;