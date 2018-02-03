const mongoose = require('mongoose');

const Group = mongoose.Schema({
    name: {type: String, default:''},
    category: {type: String, default:''},
    image: {type: String, default:'default.png'},
    members: [{
        username: {type: String, default: ''},
        email: {type: String, default:''},
    }]
});

module.exports = mongoose.model('group',Group);