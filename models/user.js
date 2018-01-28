const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: { type: String, unique: true},
    fullname: { type: String },
    email: { type: String, unique: true},
    password: { type: String},
    userImage: { type: String, default: 'default.png'},
    facebook: { type: String},
    fbTokens: Array,
    google: { type: String},
    googleTokens: Array
});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);