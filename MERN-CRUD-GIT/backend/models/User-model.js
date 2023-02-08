const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true, unique:true},
    password:{type:String, required:true, trim:true},
    avatar:{type:String, trim:true},
    date:{type:Date, required:true, default:Date.now}
});

module.exports = mongoose.model("userDetails", UserSchema);